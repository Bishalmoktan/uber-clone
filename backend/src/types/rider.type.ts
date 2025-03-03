import { Model } from "mongoose";

export interface IRider {
  _id: string;
  fullname: {
    firstname: string;
    lastname?: string;
  };
  email: string;
  password: string;
  location: ILocation;
  vehicle: IVehicle;
  status: "active" | "inactive";
  socketId?: string;
  generateAuthTokens: () => string;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IRiderModel extends Model<IRider> {
  hashPassword(password: string): Promise<string>;
}

interface ILocation {
  ltd: number;
  lng: number;
}

interface IVehicle {
  color: string;
  plate: string;
  capacity: number;
  vehileType: "car" | "bike" | "auto";
}

export type CreateRiderDTO = Pick<
  IRider,
  "fullname" | "email" | "password" | "vehicle"
>;
