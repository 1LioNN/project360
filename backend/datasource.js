import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USR,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    dialect: `postgres`,
  }
);

// export const sequelize = new Sequelize(
//   `postgres://${process.env.DB_USR}:${process.env.DB_PWD}@${process.env.DB_LOCALHOST}:${process.env.DB_LOCALPORT}/${process.env.DB_LOCALNAME}`
// );
