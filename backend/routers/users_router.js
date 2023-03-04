import { User, Item, Room } from "../models/index.js";
import { Router } from "express";
import bcrypt from "bcrypt";
import { isAuthenticated } from "../middleware/auth.js";

export const usersRouter = Router({ mergeParams: true });

// sign up
usersRouter.post("/signup", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      error: `username and/or password are required path parameters.`,
    });
  }

  const user = User.build({
    username: req.body.username,
  });

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const password = bcrypt.hashSync(req.body.password, salt);
  user.password = password;

  try {
    await user.save();
  } catch {
    return res.status(422).json({ error: "User creation failed." });
  }
  return res.json({
    username: user.username,
  });
});

// sign in
usersRouter.post("/signin", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      error: `username and/or password are required path parameters.`,
    });
  }

  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (user === null) {
    return res.status(401).json({ error: "Incorrect username or password." });
  }

  const hash = user.password;
  const password = req.body.password;
  const result = bcrypt.compareSync(password, hash);

  req.session.userId = user.id;

  if (!result) {
    return res.status(401).json({ error: "Incorrect username or password." });
  }
  return res.json({
    username: user.username,
  });
});

usersRouter.get("/me", async (req, res) => {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId);
    return res.json({ userId: req.session.userId });
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

  await Room.destroy({
    where: {
      UserId: req.params.id
    }
  });

  await user.removeRooms();
  await user.destroy();

  return res.json({ message: `User(id=${req.params.id}) has be been deleted.` });
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
    UserId: req.params.id
  });
  room.addUser(user);
  return res.json({
    name: room.name,
  });
})