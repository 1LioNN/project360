import { User, Item, Room } from "../models/index.js";
import { Router } from "express";
import { createHmac } from "crypto";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export const usersRouter = Router({ mergeParams: true });

// store email securely
usersRouter.post("/emails", async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({
      error: `email is required`,
    });
  }

  const email = req.body.email;
  const hmac = createHmac('sha256', process.env.EMAIL_SECRET);
  hmac.update(email);
  const hashedEmail = hmac.digest('hex');

  let user = await User.findOne({
    where: {
      email: hashedEmail,
    },
  });

  if (user === null) {
    user = await User.create({
      email: hashedEmail,
    });
  }

  req.session.userId = user.id;

  return res.json({
    userId: user.id,
  });
});

usersRouter.get("/me", async (req, res) => {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId);
    return res.json({ userId: user.id });
  }

  return res.status(404).json({ error: "User not signed in" });
});

// sign out
usersRouter.get("/signout", async (req, res) => {
  req.session.destroy();
  return res.json({ message: `Successfully logged out` });
});

// get users
usersRouter.get("/", async (req, res) => {
  const offset = req.query.offset ? req.query.offset : 0;
  const query = {
    order: [["createdAt", "DESC"]],
    offset: offset,
  };

  if (req.query.limit) {
    query.limit = req.query.limit;
  }

  const users = await User.findAll(query);

  return res.json({ items: users });
});

// get user
usersRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res
      .status(404)
      .json({ error: `User(id=${req.params.id}) not found.` });
  }

  return res.json({ user });
});

// delete user
usersRouter.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res
      .status(404)
      .json({ error: `User(id=${req.params.id}) not found.` });
  }

  const userRooms = await Room.findAll({
    where: {
      UserId: req.params.id,
    },
  });
  const roomIds = userRooms.map((room) => room.id);

  await Item.destroy({
    where: {
      RoomId: { [Op.in]: roomIds },
    },
  });

  await Room.destroy({
    where: {
      id: { [Op.in]: roomIds },
    },
  });

  await user.removeRoom();
  await user.destroy();

  return res.json({
    message: `User(id=${req.params.id}) has be been deleted.`,
  });
});
