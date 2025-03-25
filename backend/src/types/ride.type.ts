import { IRider } from "./rider.type";
import { IUser } from "./user.type";

export interface IRide {
  _id: string;
  user: IUser;
  rider?: IRider;
  vehicleType: "car" | "bike" | "auto";
  fare: number;
  pickup: string;
  destination: string;
  otp: string;
  duration?: number;
  distance?: number;
  orderId: string;
  paymentId: string;
  signature: string;
  status: "pending" | "accepted" | "ongoing" | "completed" | "cancelled";
}

export type CreateRideDTO = Pick<
  IRide,
  "user" | "vehicleType" | "pickup" | "destination"
>;
