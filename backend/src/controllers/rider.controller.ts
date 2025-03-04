import { Request, Response } from "express";
import { validationResult } from "express-validator";
import RiderModel from "../models/rider.model";
import { createRider } from "../services/rider.service";
import { BlackListTokenModel } from "../models/blacklistToken.model";

export const registerRider = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
    return;
  }

  const { fullname, email, password, vehicle } = req.body;

  const doesRiderExists = await RiderModel.findOne({ email });

  if (doesRiderExists) {
    res.status(400).json({
      message: "Rider  already exists",
    });
    return;
  }

  const hashedPassword = await RiderModel.hashPassword(password);

  const rider = await createRider({
    fullname,
    email,
    password: hashedPassword,
    vehicle,
  });

  const token = rider.generateAuthTokens();

  res.status(201).json({
    token,
    rider,
  });
};

export const loginRider = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
    return;
  }

  const { email, password } = req.body;

  const rider = await RiderModel.findOne({ email }).select("+password");

  if (!rider) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  const isPasswordCorrect = await rider?.comparePassword(password);

  if (!isPasswordCorrect) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  const token = rider.generateAuthTokens();

  res.cookie("token", token);

  res.status(200).json({
    token,
    rider,
  });
};

export const getRiderProfile = async (req: Request, res: Response) => {
  res.status(200).json(req.rider);
};

export const logoutRider = async (req: Request, res: Response) => {
  res.clearCookie("token");
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  await BlackListTokenModel.create({
    token,
  });
  res.status(200).json({
    message: "Rider logged out successfully!",
  });
};
