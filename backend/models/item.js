import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";

export const Item = sequelize.define(
  "Item",
  {
    rotate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Item",
  }
);
