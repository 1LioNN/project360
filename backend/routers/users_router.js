import { User, Item, Room } from "../models/index.js";
import { Router } from "express";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import { isAuthenticated } from "../middleware/auth.js";

export const usersRouter = Router({ mergeParams: true });

// sign in
usersRouter.post("/signin", async (req, res) => {
  
  if (!req.body.isAuthen) {
    return res.status(401).json({ error: "User not signed in" });
  }
  if (!req.body.sub) {
    return res.status(400).json({
      error: `sub is required`,
    });
  }

  let user = await User.findOne({
    where: {
      sub: req.body.sub,
    },
  });
  if (user === null) {
    user = await User.create({
      sub: req.body.sub,
    });
  }

  req.session.userId = user.id;
  console.log("1", req.session.userId);

  return res.json({
    username: user.username,
  });
});

usersRouter.get("/me", async (req, res) => {
  console.log("2", req.session.userId);
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId);
    return res.json({ userId: user.id });
  }

  return res.status(404).json({ error: "User not signed in" });
});

//usersRouter.use(isAuthenticated);

// sign out
usersRouter.get("/signout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: `Error occurred while logging out` });
    } else {
      return res.json({ message: `Successfully logged out` });
    }
  });
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

  // will need to also remove items and item junction table

  const userRooms = await Room.findAll({
    where: {
      UserId: req.params.id,
    },
  });
  await Promise.all(
    userRooms.map((room) => {
      fs.unlink(
        path.join(
          room.previewMetadata.destination,
          room.previewMetadata.filename
        ),
        (err) => {
          if (err) throw err;
        }
      );
    })
  );

  await Room.destroy({
    where: {
      UserId: req.params.id,
    },
  });

  await user.removeRooms();
  await user.destroy();

  return res.json({
    message: `User(id=${req.params.id}) has be been deleted.`,
  });
});

// temporary, for testing purposes
usersRouter.post("/", async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  return res.json({
    username: user.username,
  });
});

// temporary, for testing purposes
usersRouter.post("/:id/temp", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const room = await Room.create({
    name: req.body.name,
    UserId: req.params.id,
  });
  room.addUser(user);
  return res.json({
    name: room.name,
  });
});
