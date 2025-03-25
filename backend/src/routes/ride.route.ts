import express from "express";
import { body } from "express-validator";
import { userMiddleware } from "../middlewares/auth.middleware";
import { createRide } from "../controllers/ride.controller";

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

export default router;
