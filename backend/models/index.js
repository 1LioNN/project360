import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";
import { Item } from "./item.js";
import { Room } from "./room.js";
import { User } from "./user.js";

// one-to-many: every room has an owner, a user has many rooms
User.hasMany(Room);
Room.belongsTo(User);

// many-to-many: a user can be invited to another user's room
User.belongsToMany(Room, { through: "UserRoom" });
Room.belongsToMany(User, { through: "UserRoom" });

// one-to-many: every item has a room, a room has many items
Room.hasMany(Item);
Item.belongsTo(Room);

// many-to-many: an item can appear in many rooms and rooms have many items
Room.belongsToMany(Item, { through: "RoomItem" });
Item.belongsToMany(Room, { through: "RoomItem" });

export { Item, Room, User };
