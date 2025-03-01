import { Model, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  fullname: {
    firstname: string;
    lastname?: string;
  };
  email: string;
  password: string;
  socketId?: string;
  generateAuthTokens: () => string;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): Promise<string>;
}

export type CreateUserDTO = Pick<IUser, "fullname" | "email" | "password">;
