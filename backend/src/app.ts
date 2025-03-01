import express, { Express, Request, Response } from "express";
import cors from "cors";
import UserRoutes from "./routes/user.routes";

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Express + TypeScript Server" });
});

app.use("/api/auth", UserRoutes);

export default app;
