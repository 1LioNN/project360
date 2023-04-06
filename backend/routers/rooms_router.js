import { User, Room, Item, UserRoom } from "../models/index.js";
import { Router } from "express";
import { Op } from "sequelize";
import { createHmac } from "crypto";
import { validateUserRoomAuthorization } from "../middleware/author.js";
import dotenv from "dotenv";
dotenv.config();
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

export const roomsRouter = Router({ mergeParams: true });

roomsRouter.get("/", async (req, res) => {
  const page = req.query.page ? parseFloat(req.query.page) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 15;
  const offset = page * limit;
  const filter = req.query.filter;
  const query = {
    order: [["createdAt", "DESC"]],
    offset: offset,
  };

  if (limit) {
    query.limit = limit;
  }

  query.where = {
    UserId: req.params.userId,
  };
  let count = await Room.count({
    where: {
      UserId: req.params.userId,
    },
  });

  if (filter === "shared-with-me") {
    const userRooms = await UserRoom.findAll({
      where: {
        UserId: req.params.userId,
      },
    });
    const roomIds = userRooms.map((userRoom) => userRoom.RoomId);
    query.where = {
      [Op.and]: [
        { id: { [Op.in]: roomIds } },
        { UserId: { [Op.not]: req.params.userId } },
      ],
    };
    count = await Room.count({
      where: query.where,
    });
  } else if (filter && filter !== "my-rooms") {
    return res.status(422).json({
      error: `Query parameter 'filter' is invalid. Use either 'own' or 'invited'`,
    });
  }

  const rooms = await Room.findAll(query);
  return res.json({ items: rooms, total: count });
});

roomsRouter.post("/", async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    return res
      .status(404)
      .json({ error: `User(id=${req.params.userId}) not found.` });
  }

  const room = await Room.create({
    name: req.body.name,
    dimensions: JSON.stringify(req.body.dimensions),
    UserId: req.params.userId,
  });
  room.dimensions = JSON.parse(room.dimensions);

  await room.addUser(user);
  return res.json({ room });
});

roomsRouter.post(
  "/:roomId/invite",
  validateUserRoomAuthorization,
  async (req, res) => {
    if (!req.body.url) {
      return res.status(422).json({
        error: `url is required`,
      });
    }

    if (!req.body.sender) {
      return res.status(422).json({
        error: `sender email is required`,
      });
    }

    if (!req.body.recipient) {
      return res.status(422).json({
        error: `recipient email is required`,
      });
    }

    if (!req.body.username) {
      return res.status(422).json({
        error: `sender's username is required`,
      });
    }

    if (req.body.sender === req.body.recipient) {
      return res.status(422).json({
        error: `recipient's email cannot be the same as the sender's email`,
      });
    }

    const email = req.body.recipient;
    const hmac = createHmac("sha256", process.env.EMAIL_SECRET);
    hmac.update(email);
    const hashedEmail = hmac.digest("hex");

    const room = await Room.findByPk(req.params.roomId);

    let userList = await User.findAll({
      where: {
        email: hashedEmail,
      },
    });
    userList = userList.map((user) => user.id);
    let user = null;
    if (!userList.length) {
      user = await User.create({
        email: hashedEmail,
      });
    } else {
      const userRooms = await UserRoom.findAll({
        where: {
          RoomId: req.params.roomId,
        },
      });
      const userIds = userRooms.map((userRoom) => userRoom.UserId);
      const userId = userList.filter((id) => !userIds.includes(id))[0];
      if (!userId) {
        return res.status(422).json({
          error: `${req.body.recipient} has already been invited`,
        });
      }

      user = await User.findByPk(userId);
    }
    await room.addUser(user);

    const msg = {
      to: email,
      from: process.env.EMAIL_SENDER,
      subject: `${req.body.username} has invited you to collaborate on their room!`,
      text: req.body.url,
      html: `<h3>Welcome to Project 360! Your personal collaborative 3D Room Editor! </h3> 
      <p>${req.body.username} has invited you to collaborate on their room: <a href=${req.body.url}>${req.body.url}</a></p>`,
    };
    await sgMail
      .send(msg)
      .then(() => {
        return res.json({
          message: `email sent`,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          error: error,
        });
      });
  }
);

roomsRouter.get("/:roomId", async (req, res) => {
  const room = await Room.findByPk(req.params.roomId);
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.params.roomId}) not found.` });
  }

  room.dimensions = JSON.parse(room.dimensions);

  return res.json({ room });
});

roomsRouter.patch(
  "/:roomId",
  validateUserRoomAuthorization,
  async (req, res) => {
    const room = await Room.findByPk(req.params.roomId);
    if (!room) {
      return res
        .status(404)
        .json({ error: `Room(id=${req.params.roomId}) not found.` });
    }

    if (req.body.name) {
      room.name = req.body.name;
    }
    if (req.body.dimensions) {
      room.dimensions = JSON.stringify(req.body.dimensions);
    }

    room.save();
    room.dimensions = JSON.parse(req.body.dimensions);
    return res.json({ room });
  }
);

roomsRouter.delete(
  "/:roomId",
  validateUserRoomAuthorization,
  async (req, res) => {
    const room = await Room.findByPk(req.params.roomId);
    if (!room) {
      return res
        .status(404)
        .json({ error: `Room(id=${req.params.roomId}) not found.` });
    }

    await Item.destroy({
      where: {
        RoomId: req.params.roomId,
      },
    });
    await room.removeUser();
    await room.destroy();
    return res.json({ room });
  }
);
