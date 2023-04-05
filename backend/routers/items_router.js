import { Room, Item } from "../models/index.js";
import { validateUserItemAuthorization } from "../middleware/author.js";
import { Router } from "express";
import { io } from "../app.js";

export const itemsRouter = Router({ mergeParams: true });

itemsRouter.use(validateUserItemAuthorization);

// post furniture piece
itemsRouter.post("/", async (req, res) => {
  const room = await Room.findOne({ where: { id: req.params.roomId } });
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.params.roomId}) not found.` });
  }
  const item = await Item.create({
    coordinates: JSON.stringify(req.body.coordinates),
    rotate: 0,
    category: req.body.category,
    RoomId: room.id,
  });
  item.coordinates = JSON.parse(item.coordinates);

  io.emit("updateRoom");

  return res.json({ item });
});

// get all furniture pieces
itemsRouter.get("/", async (req, res) => {
  const room = await Room.findByPk(req.params.roomId);
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.params.roomId}) not found.` });
  }

  let items = await Item.findAll({
    where: {
      RoomId: room.id,
    },
  });

  items = items.map((item) => {
    item.coordinates = JSON.parse(item.coordinates);
    return item;
  });
  return res.json({ items });
});

// get furniture piece
itemsRouter.get("/:id", async (req, res) => {
  const room = await Room.findOne({ where: { id: req.params.roomId } });
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.params.roomId}) not found.` });
  }

  const item = await Item.findAll({
    where: { id: req.params.id, RoomId: req.params.roomId },
  });
  if (!item) {
    return res
      .status(404)
      .json({ error: `Item(id=${req.params.itemId}) not found.` });
  }
  item.coordinates = JSON.parse(item.coordinates);
  return res.json({ item });
});

// rotate the item once it has been placed
itemsRouter.patch("/:id/rotate/", async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  if (!item) {
    return res
      .status(404)
      .json({ error: `Item(id=${req.params.id}) not found.` });
  }
  const degree = req.body.degree;
  if (!degree && degree !== 0) {
    return res
      .status(422)
      .json({ error: `Missing required parameter 'degree' in request body.` });
  }
  if (degree < -2 * Math.PI || degree > 2 * Math.PI) {
    return res.status(400).json({ error: `Invalid degree ${degree}.` });
  }
  item.rotate = req.body.degree;
  await item.save();
  item.coordinates = JSON.parse(item.coordinates);

  io.emit("updateRoom");

  return res.json({ item });
});

// move the item once it has been placed
itemsRouter.patch("/:id/move", async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  if (!item) {
    return res
      .status(404)
      .json({ error: `Item(id=${req.params.id}) not found.` });
  }

  if (!req.body.coordinates) {
    return res.status(422).json({
      error: `Missing required parameter 'coordinates' in request body.`,
    });
  }

  item.coordinates = JSON.stringify(req.body.coordinates);
  await item.save();
  item.coordinates = JSON.parse(item.coordinates);

  // emit socket io event to tell other clients to update the room
  io.emit("updateRoom");

  return res.json({ item });
});

// delete item from room
itemsRouter.delete("/:id", async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  if (!item) {
    return res
      .status(404)
      .json({ error: `Item(id=${req.params.id}) not found.` });
  }

  io.emit("updateRoom");

  await item.destroy();
  return res.json({ item });
});
