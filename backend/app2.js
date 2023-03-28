'use strict'
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
const port = 5000; 

class App {
  constructor(port) {
    this.clients = {}
    this.port = port

    const app = express(); 
    app.use(cors());
    app.use(bodyParser.json());
    app.use(
        session({
          secret: "i changed this secret",
          resave: false,
          saveUninitialized: true,
        })
      );

    this.server = new http.Server(app)
    const io = new Server(server, { 
      cors: {
        origin: "http://localhost:3000",
      }, 
    }); 

    io.on('connection', (socket) => {
      this.clients[socket.id] = {}
      console.log('a user connected : ' + socket.id)
      socket.emit('id', socket.id)

      socket.on('disconnect', () => {
        console.log('socket disconnected : ' + socket.id)
        if (this.clients && this.clients[socket.id]) {
          console.log('deleting ' + socket.id)
          delete this.clients[socket.id]
          this.io.emit('removeClient', socket.id)
        }
      })

      socket.on('update', (message) => {
        if (this.clients[socket.id]) {
          this.clients[socket.id].t = message.t //client timestamp
          this.clients[socket.id].p = message.p //position
        }
      })
    })
    setInterval(() => {
      this.io.emit('clients', this.clients)
    }, 50)

  }
  Start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}.`)
    })
  }
}

try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: { drop: false } });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.use("/api/users", usersRouter);
  app.use("/api/users/:userId/rooms", roomsRouter);
  app.use("/api/items", itemsRouter);

  app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", port);
  });
new App(port).Start()