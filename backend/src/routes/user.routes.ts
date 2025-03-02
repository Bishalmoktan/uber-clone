import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getUserProfile } from "../controllers/user.controller";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);

export default router;
