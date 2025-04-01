import { Server } from "socket.io";
import UserModel from "./models/user.model";
import RiderModel from "./models/rider.model";

let io: Server;

export function initializeSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      console.log(userId, userType);

      if (userType === "user") {
        await UserModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "rider") {
        await RiderModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

export const sendMessageToSocketId = (socketId: any, messageObject: any) => {
  console.log(messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};
