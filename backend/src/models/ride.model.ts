import { model, Schema } from "mongoose";
import { IRide } from "../types/ride.type";

export const RideSchema = new Schema<IRide>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  rider: {
    type: Schema.Types.ObjectId,
    ref: "rider",
  },
  fare: {
    type: Number,
    required: true,
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
    select: false,
  },
  vehicleType: {
    type: String,
    enum: ["bike", "auto", "car"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number,
  }, // in seconds
  distance: {
    type: Number,
  }, // in meters
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
});

export const RideModel = model<IRide>("Ride", RideSchema);
