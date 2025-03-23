import { Request, Response } from "express";
import {
  getAddressCoordinate,
  getAutoCompleteSuggestionsForLocation,
  getDistanceAndTime,
} from "../services/maps.service";
import { validationResult } from "express-validator";

export const getCoordinates = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { address } = req.query;

  try {
    const coordinates = await getAddressCoordinate(address as string);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({
      message: "Coordinates not found",
    });
  }
};

export const getDistanceTime = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { origin, destination } = req.query;

    const distanceTime = await getDistanceAndTime(
      origin as string,
      destination as string
    );

    res.status(200).json(distanceTime);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAutoCompleteSuggestions = async (
  req: Request,
  res: Response
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { input } = req.query;

    const suggestions = await getAutoCompleteSuggestionsForLocation(
      input as string
    );

    res.status(200).json(suggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
