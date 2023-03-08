import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("User", {
  sub: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
