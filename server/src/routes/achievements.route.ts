import { Router } from "express";
import { getAchievements, checkAndUnlockAchievements } from "../controllers/achievements.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getAchievements);
router.post("/check-unlock", authMiddleware, checkAndUnlockAchievements);

export default router;
