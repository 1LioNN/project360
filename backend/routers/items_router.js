import { User, Room, Item } from "../models/index.js";
import { Router } from "express";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";
import { isAuthenticated } from "../middleware/auth.js";

export const itemsRouter = Router({ mergeParams: true });

// post furniture piece
// api/items?$roomId=${roomId}
itemsRouter.post("/", async (req, res) => {
  const room = await Room.findOne({ where: { id: req.query.roomId } });
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.query.roomId}) not found.` });
  }
  const item = await Item.create({
    coordinates: JSON.stringify(req.body.coordinates),
    rotate: 0,
    category: req.body.category,
    RoomId: room.id,
  });
  item.coordinates = JSON.parse(item.coordinates);
  return res.json({ item });
});

// get all furniture pieces
// api/items?roomId=${roomId}
itemsRouter.get("/", async (req, res) => {
  const room = await Room.findByPk(req.query.roomId);
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.query.roomId}) not found.` });
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
// api/items/:id?roomId=${roomId}
itemsRouter.get("/:id", async (req, res) => {
  const room = await Room.findOne({ where: { id: req.query.roomId } });
  if (!room) {
    return res
      .status(404)
      .json({ error: `Room(id=${req.query.roomId}) not found.` });
  }

  const item = await Item.findAll({
    where: { id: req.params.id, RoomId: req.query.roomId },
  });
  if (!item) {
    return res
      .status(404)
      .json({ error: `Item(id=${req.params.itemId}) not found.` });
  }
  item.coordinates = JSON.parse(item.coordinates);
  return res.json({ item });
});

// will need to update at some point
// display items for the sidebar according to category
itemsRouter.get("/catergories/:type", async (req, res) => {
  const items = await Item.findAll({
    where: { category: req.params.type },
    order: [["id", "ASC"]],
  });
  if (items.length === 0) {
    return res
      .status(404)
      .json({ error: `Items with category ${req.params.type} not found.` });
  }
  return res.json({ items });
});

// rotate the item once it has been placed
itemsRouter.patch("/:id/rotate", async (req, res) => {
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
  return res.json({ item });
});

// delete item from room
// api/items/:id?roomId=${roomId}
itemsRouter.delete("/:id", async (req, res) => {
  const item = await Item.findOne({
    where: { id: req.params.id, RoomId: req.query.roomId },
  });
  if (!item) {
    return res
      .status(404)
      .json({ error: `Item(id=${req.params.id}) not found.` });
  }
  await item.destroy();
  return res.json({ item });
});
