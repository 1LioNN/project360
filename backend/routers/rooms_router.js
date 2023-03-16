import { User, Room, Item } from "../models/index.js";
import { Router } from "express";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";
import { isAuthenticated } from "../middleware/auth.js";

export const roomsRouter = Router({ mergeParams: true });

const getCursor = async (cursor, res) => {
  const roomCursor = await Room.findByPk(cursor);
  if (!roomCursor) {
    return res.status(404).json({ error: `Room(id=${cursor}) not found.` });
  }
  return roomCursor;
};

const getPrevRooms = async (req, res) => {
  const limit = req.query.limit;
  const cursor = req.query.cursor;

  const prevRoom = await getCursor(cursor, res);

  const rooms = await Room.findAll({
    limit: limit + 1,
    order: [["createdAt", "ASC"]],
    where: {
      UserId: req.params.userId,
      createdAt: { [Op.gte]: new Date(prevRoom.createdAt) },
    },
  });

  const newNext = await Room.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
    where: {
      UserId: req.params.userId,
      createdAt: { [Op.lt]: new Date(prevRoom.createdAt) },
    },
  });

  // note that reverse() affects the original array
  rooms.reverse();
  const newPrev = rooms.length === limit + 1 ? rooms.shift() : null;
  return res.json({
    items: rooms,
    prev: newPrev,
    next: newNext[0] ? newNext[0] : null,
  });
};

const getNextRooms = async (req, res) => {
  const limit = req.query.limit;
  const cursor = req.query.cursor;

  const nextRoom = await getCursor(cursor, res);

  const rooms = await Room.findAll({
    limit: limit + 1,
    order: [["createdAt", "DESC"]],
    where: {
      UserId: req.params.userId,
      createdAt: { [Op.lte]: new Date(nextRoom.createdAt) },
    },
  });

  const newPrev = await Room.findAll({
    limit: 1,
    order: [["createdAt", "ASC"]],
    where: {
      UserId: req.params.userId,
      createdAt: { [Op.gt]: new Date(nextRoom.createdAt) },
    },
  });

  const newNext = rooms.length === limit + 1 ? rooms.pop() : null;
  return res.json({
    items: rooms,
    prev: newPrev[0] ? newPrev[0] : null,
    next: newNext,
  });
};

roomsRouter.get("/", async (req, res) => {
  const action = req.query.action;
  const limit = req.query.limit;
  const cursor = req.query.cursor;

  // get prev or next page (relative to cursor)
  if (action && cursor && limit) {
    const isValidAction = action === `next` || action === `prev`;
    if (!isValidAction) {
      return res.status(422).json({
        error: `${action} is not a valid value to the action query parameter (use either 'prev' or 'next').`,
      });
    }

    return action === `next` ? getNextRooms(req, res) : getPrevRooms(req, res);
  }

  // get the first page
  if (!action && !cursor && limit) {
    const firstRoom = await Room.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]],
      where: {
        UserId: req.params.userId,
      },
    });

    if (!firstRoom[0]) {
      return res.json({ items: firstRoom, prev: null, next: null });
    }
    return getNextRooms(req, res);
  }

  // get list of everything
  if (!action && !cursor && !limit) {
    const rooms = await Room.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        UserId: req.params.userId,
      },
    });
    return res.json({ items: rooms });
  }

  return res.status(422).json({
    error: `The provided query parameters are invalid. Please ensure that 'limit', 'cursor', and 'action' are provided correctly and are compatible with each other.`,
  });
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
    dimensions: req.body.dimensions,
    UserId: req.params.userId,
  });
  return res.json(room);
});

roomsRouter.get("/:id", async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.params.id}) not found.` });
  }

  return res.json(room);
});

roomsRouter.patch("/:id", async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.params.id}) not found.` });
  }

  if (req.body.name) {
    room.name = req.body.name;
  }
  if (req.body.dimensions) {
    room.dimensions = req.body.dimensions;
  }

  room.save();
  return res.json(room);
});

roomsRouter.delete("/:id", async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.params.id}) not found.` });
  }

  if (room.previewMetadata) {
    await fs.unlink(
      path.join(
        room.previewMetadata.destination,
        room.previewMetadata.filename
      ),
      (err) => {
        if (err) throw err;
      }
    );
  }

  await room.removeItems();
  await room.destroy();
  return res.json(room);
});

/*
roomsRouter.get("/:id/snapshot", async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.params.id}) not found.` });
  }

  res.setHeader("Content-Type", room.previewMetadata.mimetype);
  res.sendFile(room.previewMetadata.path, { root: path.resolve() });
});

roomsRouter.patch("/:id/snapshot", upload.single("file"), async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.params.id}) not found.` });
  }

  if (room.previewMetadata) {
    await fs.unlink(
      path.join(
        room.previewMetadata.destination,
        room.previewMetadata.filename
      ),
      (err) => {
        if (err) throw err;
      }
    );
  }

  room.previewMetadata = req.file;
  room.save();
  return res.json(room);
});
*/