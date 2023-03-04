import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";

export const Item = sequelize.define("Item", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
