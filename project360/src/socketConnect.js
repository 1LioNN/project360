import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "project360.me:5001";

export const socket = io.connect(URL, {
  withCredentials: true,
});
