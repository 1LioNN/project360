import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";

export const Room = sequelize.define("Room", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  previewMetadata: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});
