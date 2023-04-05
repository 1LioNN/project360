import { io } from "socket.io-client";
const URL = "https://api.project360.me";

export const socket = io(URL, {
  withCredentials: true,
  transports: ["websocket"],
});
