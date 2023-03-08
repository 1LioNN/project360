import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";

export const Item = sequelize.define("Item", {
  rotate: {
    type: DataTypes.INTEGER,
  },
  coordinates: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
