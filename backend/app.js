import { sequelize } from "./datasource.js";
import express from "express";
import bodyParser from "body-parser";
import validateAccessToken from "./middleware/authen.js";
import { usersRouter } from "./routers/users_router.js";
import { roomsRouter } from "./routers/rooms_router.js";
import { itemsRouter } from "./routers/items_router.js";
import session from "express-session";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
export const app = express();
const server = http.createServer(app);
import dotenv from "dotenv";
dotenv.config();

const PORT = 5000;
const clients = {};

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  clients[socket.id] = {};
  console.log("a user connected : " + socket.id);
  socket.emit("id", socket.id);
  socket.emit("hello", "world");

  socket.on("disconnect", () => {
    console.log("socket disconnected : " + socket.id);
    if (clients && clients[socket.id]) {
      console.log("deleting " + socket.id);
      delete clients[socket.id];
      io.emit("removeClient", socket.id);
    }
  });

  socket.on("update", (message) => {
    if (clients[socket.id]) {
      socket.broadcast.emit("position", message);
      clients[socket.id].t = message.t; //client timestamp
      clients[socket.id].p = message.p; //position
    }
  });
});

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(function (req, res, next) {
  req.io = io;
  next();
});

//app.use(validateAccessToken);

app.use("/api/users", usersRouter);
app.use("/api/users/:userId/rooms", roomsRouter);
app.use("/api/users/:userId/rooms/:roomId/items", itemsRouter);

// const socketIoObject = io;
// module.exports.ioObject = socketIoObject;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});

io.listen(5001);
