import express from "express";
import { userMiddleware } from "../middlewares/auth.middleware";
import {
  getAutoCompleteSuggestions,
  getCoordinates,
  getDistanceTime,
} from "../controllers/maps.controller";
const { query } = require("express-validator");

const router = express.Router();

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  userMiddleware,
  getCoordinates
);
router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  userMiddleware,
  getDistanceTime
);
router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  userMiddleware,
  getAutoCompleteSuggestions
);

export default router;
