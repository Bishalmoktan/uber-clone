import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createRideService, getFareForAll } from "../services/ride.service";

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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
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
