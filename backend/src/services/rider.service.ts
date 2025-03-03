import RiderModel from "../models/rider.model";
import { CreateRiderDTO } from "../types/rider.type";

export const createRider = async ({
  fullname,
  email,
  password,
  vehicle,
}: CreateRiderDTO) => {
  if (!fullname.firstname || !email || !password || !vehicle) {
    throw new Error("All fields are required");
  }

  const rider = await RiderModel.create({
    fullname,
    email,
    password,
    vehicle,
  });

  return rider;
};
