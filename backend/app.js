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
import redis from "redis";
import redisAdapter from "@socket.io/redis-adapter";
export const app = express();
const server = http.createServer(app);
import dotenv from "dotenv";
import Sentry from "@sentry/node";
import Tracing from "@sentry/tracing";
dotenv.config();

const PORT = 5000;
const clients = {};

app.use(
  cors({
    origin: `https://project360.me`,
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

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 0.1,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

export const io = new Server(server, {
  cors: {
    origin: `https://project360.me`,
    credentials: true,
  },
});

const pubClient = redis.createClient({
  url: `redis://redis:6379`,
});
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(redisAdapter.createAdapter(pubClient, subClient));
});

io.on("connection", (socket) => {
  clients[socket.id] = {};
  console.log("a user connected : " + socket.id);

  socket.on("disconnect", () => {
    console.log("socket disconnected : " + socket.id);
    if (clients && clients[socket.id]) {
      console.log("deleting " + socket.id);
      delete clients[socket.id];
      io.emit("removeClient", socket.id);
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

app.use(Sentry.Handlers.errorHandler());
app.use(validateAccessToken);

app.use("/api/users", usersRouter);
app.use("/api/users/:userId/rooms", roomsRouter);
app.use("/api/users/:userId/rooms/:roomId/items", itemsRouter);

server.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
