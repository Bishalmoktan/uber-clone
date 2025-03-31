import express from "express";
import { body, query } from "express-validator";
import { userMiddleware } from "../middlewares/auth.middleware";
import { createRide, getFare } from "../controllers/ride.controller";

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
