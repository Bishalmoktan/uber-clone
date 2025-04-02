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

      if (userType === "user") {
        await UserModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "rider") {
        await RiderModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-rider-location", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        socket.emit("error", {
          message: "Invalid location data",
        });
        return;
      }

      await RiderModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

export const sendMessageToSocketId = (socketId: any, messageObject: any) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};
