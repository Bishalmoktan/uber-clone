import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/auth.routes";
import UserRoutes from "./routes/user.routes";

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Express + TypeScript Server" });
});

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);

export default app;
