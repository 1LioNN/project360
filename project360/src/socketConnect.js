import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "api.project360.me";

export const socket = io.connect(URL, {
  withCredentials: true,
});
