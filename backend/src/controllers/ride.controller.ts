import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  confirmRideService,
  createRideService,
  endRideService,
  getFareForAll,
  startRideService,
} from "../services/ride.service";
import {
  getAddressCoordinate,
  getRiderWithinRadius,
} from "../services/maps.service";
import { RideModel } from "../models/ride.model";
import { sendMessageToSocketId } from "../socket";

export const createRide = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);

    const pickupCoordinates = await getAddressCoordinate(pickup);
    const ridersWithinRadius = await getRiderWithinRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    ); // within 2km

    const rideWithUser = await RideModel.findOne({ _id: ride._id }).populate(
      "user"
    );

    ridersWithinRadius.map((rider) => {
      sendMessageToSocketId(rider.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const confirmRide = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { rideId, riderId } = req.body;

  try {
    const ride = await confirmRideService(rideId, riderId);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (err: unknown) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

export const getFare = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { pickup, destination } = req.query;

  if (!pickup || !destination) {
    res.status(404).json({
      error: "Pickup or destination missing",
    });
    return;
  }

  try {
    const fare = await getFareForAll(pickup as string, destination as string);
    res.status(201).json(fare);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const startRide = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { rideId, riderId } = req.body;
  try {
    const ride = await startRideService(rideId as string, riderId);

    console.log(ride);

    sendMessageToSocketId(ride!.rider!.socketId, {
      event: "ride-started",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const endRide = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { rideId } = req.body;

  try {
    const ride = await endRideService(rideId, req.rider);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
