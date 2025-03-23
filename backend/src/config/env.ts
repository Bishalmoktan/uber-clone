import dotenv from "dotenv";

dotenv.config();

export const { PORT, MONGODB_URI, JWT_SECRET, GOOGLE_MAP_API } = process.env;
