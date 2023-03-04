import { sequelize } from "./datasource.js";
import express from "express";
import bodyParser from "body-parser";
import { usersRouter } from "./routers/users_router.js";

const PORT = 3000;
export const app = express();

app.use(bodyParser.json());

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use("/api/users", usersRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
