import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import UserModel from "../models/user.model";
import { BlackListTokenModel } from "../models/blacklistToken.model";
import RiderModel from "../models/rider.model";

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload;

    if (!decoded._id) {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }

    const blacklistedToken = await BlackListTokenModel.findOne({ token });

    if (blacklistedToken) {
      res.status(401).json({
        message: "Unauthorized!",
      });
      return;
    }

    const user = await UserModel.findById(decoded._id);

    if (!user) {
      res.status(401).json({
        message: "User not found",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
};

export const riderMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload;

    if (!decoded._id) {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }

    const blacklistedToken = await BlackListTokenModel.findOne({ token });

    if (blacklistedToken) {
      res.status(401).json({
        message: "Unauthorized!",
      });
      return;
    }

    const rider = await RiderModel.findById(decoded._id);

    if (!rider) {
      res.status(401).json({
        message: "Rider not found",
      });
      return;
    }

    req.rider = rider;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
};
