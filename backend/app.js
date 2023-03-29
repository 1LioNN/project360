import { sequelize } from "./datasource.js";
import express from "express";
import bodyParser from "body-parser";
import { usersRouter } from "./routers/users_router.js";
import { roomsRouter } from "./routers/rooms_router.js";
import { itemsRouter } from "./routers/items_router.js";
import session from "express-session";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
export const app = express();
const server = http.createServer(app);

const PORT = 5000;
const clients = {}; 
const furniture = {}; 

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "i changed this secret",
    resave: false,
    saveUninitialized: true,
  })
);

const io = new Server(server, { 
  cors: {
    origin: "http://localhost:3000",
  }, 
}); 


  io.on("connection", (socket) => {
    clients[socket.id] = {};
    console.log("a user connected : " + socket.id);
    socket.emit("id", socket.id);
    socket.emit("hello", "world"); 

    socket.on("disconnect", () => {
      console.log("socket disconnected : " + socket.id);
      if (clients && clients[socket.id]) {
        console.log("deleting " + socket.id);
        delete clients[socket.id];
        io.emit("removeClient", socket.id);
      }
    });

    socket.on("update", (message) => {
      if (clients[socket.id]) {
        socket.broadcast.emit("position", message);
        clients[socket.id].t = message.t; //client timestamp
        clients[socket.id].p = message.p; //position
      }
    });

  });
 

setInterval(() => {
  // console.log("server side"); 
  // console.log(clients); 
  io.emit("clients", clients);
}, 50);

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(function(req,res,next){
  req.io = io;
  next();
});

app.use("/api/users", usersRouter);
app.use("/api/users/:userId/rooms", roomsRouter);
app.use("/api/items", itemsRouter);

// const socketIoObject = io;
// module.exports.ioObject = socketIoObject;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});

io.listen(5001)
