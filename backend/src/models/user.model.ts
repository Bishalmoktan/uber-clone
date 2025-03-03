import mongoose, { Schema, Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config/env";
import { IUser, IUserModel } from "../types/user.type";

const UserSchema = new Schema<IUser>({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "First name must be 3 characters long"],
    },
    lastname: {
      type: String,
      minLength: [3, "Last name must be 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Email must be 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

UserSchema.methods.generateAuthTokens = function (): string {
  return jwt.sign({ _id: this._id }, JWT_SECRET!, { expiresIn: "24h" });
};

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = async function (
  password: string
): Promise<string> {
  return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default UserModel;
