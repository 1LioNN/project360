import { Room, UserRoom } from "../models/index.js";

const validateUserRoomAuthorization = async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const roomId = parseInt(req.params.roomId);

  const room = await Room.findByPk(roomId);
  if (room.UserId !== userId) {
    return res.status(403).json({
      error: `User is unauthorized to do that`,
    });
  }

  next();
};

const validateUserItemAuthorization = async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const roomId = parseInt(req.params.roomId);

  const userRooms = await UserRoom.findAll({
    where: {
      UserId: userId,
    },
  });
  const roomIds = userRooms.map((room) => room.RoomId);

  if (!roomIds.includes(roomId)) {
    return res.status(403).json({
      error: `User is unauthorized to do that`,
    });
  }

  next();
};

export { validateUserRoomAuthorization, validateUserItemAuthorization };
