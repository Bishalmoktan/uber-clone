import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/user.route";
import RiderRoutes from "./routes/rider.route";
import MapsRoutes from "./routes/maps.route";
import RideRoutes from "./routes/ride.route";

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

app.use("/api/users", UserRoutes);
app.use("/api/riders", RiderRoutes);
app.use("/api/maps", MapsRoutes);
app.use("/api/ride", RideRoutes);

export default app;
