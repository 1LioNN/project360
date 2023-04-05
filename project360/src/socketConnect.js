import { io } from "socket.io-client";
const URL = "http://localhost:5000";

export const socket = io(URL, {
  withCredentials: true,
  transports: ['websocket'],
  autoConnect: false,
});

socket.on('bar', (data) => {
  console.log(data);
});

socket.emit('foo', { data: 'bazinga' });

// import { createClient } from 'redis';

// const redis = createClient();

// "undefined" means the URL will be computed from the `window.location` object


// await redis.connect(URL, {
//   withCredentials: true,

// });

// redis.on('error', err => console.log('Redis Client Error', err));

// export default redis; 


// export const socket = io.connect(URL, {
//   withCredentials: true,
// });
