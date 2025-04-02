import crypto from "crypto";
import { getDistanceAndTime } from "./maps.service";
import { CreateRideDTO } from "../types/ride.type";
import { RideModel } from "../models/ride.model";

export const getFareForAll = async (pickup: string, destination: string) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getDistanceAndTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    bike: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };

  return fare;
};

const getOtp = (num: number) => {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
};

export const createRideService = async ({
  destination,
  pickup,
  user,
  vehicleType,
}: CreateRideDTO) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFareForAll(pickup, destination);

  const ride = RideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    vehicleType,
    fare: fare[vehicleType],
  });

  return ride;
};

export const confirmRideService = async (rideId: string, riderId: string) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await RideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      rider: riderId,
    }
  );

  const ride = await RideModel.findOne({
    _id: rideId,
  })
    .populate("user")
    .populate("rider")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};
