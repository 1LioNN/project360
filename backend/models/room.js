import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";

export const Room = sequelize.define(
  "Room",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dimensions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Room",
  }
);
