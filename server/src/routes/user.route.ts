import { Router } from "express";
import { getProfile, updateProfile, getUserAchievements, getUserAverageScore } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", authMiddleware, getProfile);
router.patch("/", authMiddleware, updateProfile);
router.get("/achievements", authMiddleware, getUserAchievements);
router.get("/average-score", authMiddleware, getUserAverageScore);

export default router;
