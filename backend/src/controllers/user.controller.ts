import { Request, Response } from "express";
import { validationResult } from "express-validator";
import UserModel from "../models/user.model";
import { createUser } from "../services/user.service";
import { BlackListTokenModel } from "../models/blacklistToken.model";

export const getUserProfile = async (req: Request, res: Response) => {
  res.status(200).json(req.user);
};

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
    return;
  }

  const { fullname, email, password } = req.body;

  const doesUserExists = await UserModel.findOne({ email });

  if (doesUserExists) {
    res.status(400).json({
      message: "User  already exists",
    });
    return;
  }

  const hashedPassword = await UserModel.hashPassword(password);

  const user = await createUser({
    fullname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthTokens();

  res.cookie("token", token);

  res.status(201).json({ token, user });
};

export const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
    return;
  }

  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  const token = user.generateAuthTokens();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  await BlackListTokenModel.create({
    token,
  });
  res.status(200).json({
    message: "User logged out successfully!",
  });
};
