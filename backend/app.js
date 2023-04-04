import { sequelize } from "./datasource.js";
import express from "express";
import bodyParser from "body-parser";
import { usersRouter } from "./routers/users_router.js";
import { roomsRouter } from "./routers/rooms_router.js";
import { itemsRouter } from "./routers/items_router.js";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import Sentry from "@sentry/node"; 
import Tracing from "@sentry/tracing";
dotenv.config();

const PORT = 5000;
export const app = express();

app.use(cors({
  origin: `http://localhost:${process.env.PORT || 3000}`,
  credentials: true
}));
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

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);

app.use(Sentry.Handlers.errorHandler());
app.use("/api/users", usersRouter);
app.use("/api/users/:userId/rooms", roomsRouter);
app.use("/api/items", itemsRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
