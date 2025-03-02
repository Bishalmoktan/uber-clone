import { Request, Response } from "express";

export const getUserProfile = async (req: Request, res: Response) => {
  res.status(200).json(req.user);
};
