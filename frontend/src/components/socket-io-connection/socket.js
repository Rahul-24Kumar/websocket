import io from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

export const socket = io(`${ENDPOINT}`, {
  cors: "*",
  transports: ["websocket"],
});

socket.on("connect_error", (error) => {
  console.log(error);
});
// console.log(socket)