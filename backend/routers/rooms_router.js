import { User, Room, Item } from "../models/index.js";
import { Router } from "express";
import { Op } from "sequelize";

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

  let rooms = await Room.findAll({
    limit: limit + 1,
    order: [["createdAt", "ASC"]],
    where: {
      UserId: req.params.userId,
      createdAt: { [Op.gte]: new Date(prevRoom.createdAt) },
    },
  });
  rooms = rooms.map((room) => {
    room.dimensions = JSON.parse(room.dimensions);
    return room;
  });

  const newNext = await Room.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
    where: {
      UserId: req.params.userId,
      createdAt: { [Op.lt]: new Date(prevRoom.createdAt) },
    },
  });
  if (newNext[0]) {
    newNext[0].dimensions = JSON.parse(newNext[0].dimensions);
  }

  // note that reverse() affects the original array
  rooms.reverse();
  const newPrev = rooms.length === limit + 1 ? rooms.shift() : null;
  if (newPrev) {
    newPrev.dimensions = JSON.parse(newPrev.dimensions);
  }
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

  let rooms = await Room.findAll({
    limit: limit + 1,
    order: [["createdAt", "DESC"]],
    where: {
      UserId: req.params.userId,
      createdAt: { [Op.lte]: new Date(nextRoom.createdAt) },
    },
  });
  rooms = rooms.map((room) => {
    room.dimensions = JSON.parse(room.dimensions);
    return room;
  });

  const newPrev = await Room.findAll({
    limit: 1,
    order: [["createdAt", "ASC"]],
    where: {
      UserId: req.params.userId,
      createdAt: { [Op.gt]: new Date(nextRoom.createdAt) },
    },
  });
  if (newPrev[0]) {
    newPrev[0].dimensions = JSON.parse(newPrev[0].dimensions);
  }

  const newNext = rooms.length === limit + 1 ? rooms.pop() : null;
  if (newNext) {
    newNext.dimensions = JSON.parse(newNext.dimensions);
  }
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
    let rooms = await Room.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        UserId: req.params.userId,
      },
    });
    rooms = rooms.map((room) => {
      room.dimensions = JSON.parse(room.dimensions);
      return room;
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
    dimensions: JSON.stringify(req.body.dimensions),
    UserId: req.params.userId,
  });
  room.dimensions = JSON.parse(room.dimensions);

  await room.addUser(user);
  return res.json({ room });
});

roomsRouter.get("/:id", async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.params.id}) not found.` });
  }

  room.dimensions = JSON.parse(room.dimensions);

  return res.json({ room });
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
    room.dimensions = JSON.stringify(req.body.dimensions);
  }

  room.save();
  room.dimensions = JSON.parse(req.body.dimensions);
  return res.json({ room });
});

roomsRouter.delete("/:id", async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.params.id}) not found.` });
  }

  await Item.destroy({
    where: {
      RoomId: req.params.id,
    },
  });
  await room.removeUser();
  await room.destroy();
  return res.json({ room });
});
