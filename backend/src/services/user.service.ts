import UserModel from "../models/user.model";
import { CreateUserDTO } from "../types/user.type";

export const createUser = async ({
  fullname,
  email,
  password,
}: CreateUserDTO) => {
  if (!fullname.firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  const user = UserModel.create({
    fullname,
    email,
    password,
  });

  return user;
};
