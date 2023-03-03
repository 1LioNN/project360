import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";
import { Item } from "./item.js";
import { Room } from "./room.js";
import { User } from "./user.js";

User.belongsToMany(Room, { through: "UserRooms" });
Room.belongsToMany(User, { through: "UserRooms" });

Room.hasMany(Item);
Item.belongsTo(Room);

export { Item, Room, User };
