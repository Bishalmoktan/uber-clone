import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import UserModel from "../models/user.model";
import { createUser } from "../services/user.service";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
    return;
  }

  const { fullname, email, password } = req.body;

  const hashedPassword = await UserModel.hashPassword(password);

  const user = await createUser({
    fullname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthTokens();

  res.status(201).json({ token, user });
};
