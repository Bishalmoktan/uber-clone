import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env";

export const connectToDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("Can't find MONGODB URI");
    }
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
