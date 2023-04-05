import { Item } from "./item.js";
import { Room } from "./room.js";
import { User } from "./user.js";
import { sequelize } from "../datasource.js";

// one-to-many: every room has an owner, a user has many rooms
User.hasMany(Room);
Room.belongsTo(User);

// many-to-many: a user can be invited to another user's room
const UserRoom = sequelize.define("UserRoom", {}, { tableName: "UserRoom" });

User.belongsToMany(Room, { through: UserRoom });
Room.belongsToMany(User, { through: UserRoom });

// one-to-many: every item has a room, a room has many items
Room.hasMany(Item);
Item.belongsTo(Room);

export { Item, Room, User, UserRoom };
