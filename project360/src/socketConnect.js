// import { io } from "socket.io-client";
import { createClient } from 'redis';

const redis = createClient();

// "undefined" means the URL will be computed from the `window.location` object
const URL = "api.project360.me";

await redis.connect(URL, {
  withCredentials: true,

});

redis.on('error', err => console.log('Redis Client Error', err));

export default redis; 


// export const socket = io.connect(URL, {
//   withCredentials: true,
// });
