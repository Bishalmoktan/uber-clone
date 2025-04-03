import express from "express";
import { body, query } from "express-validator";
import {
  riderMiddleware,
  userMiddleware,
} from "../middlewares/auth.middleware";
import {
  confirmRide,
  createRide,
  endRide,
  getFare,
  startRide,
} from "../controllers/ride.controller";

const router = express.Router();

router.post(
  "/create-ride",
  userMiddleware,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "bike"])
    .withMessage("Invalid vehicle type"),
  createRide
);

router.post(
  "/confirm",
  riderMiddleware,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  confirmRide
);

router.post(
  "/start-ride",
  userMiddleware,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  body("riderId").isMongoId().withMessage("Invalid rider id"),
  startRide
);

router.post(
  "/end-ride",
  riderMiddleware,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  endRide
);

router.get(
  "/get-fare",
  userMiddleware,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  getFare
);

export default router;
