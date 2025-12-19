import type { Request, Response } from "express";
import { getAchievementsService, checkAndUnlockAchievementsService } from "../services/achievements.service.js";

export const getAchievements = async (req: Request, res: Response) => {
  try {
    const achievements = await getAchievementsService();
    res.status(200).json(achievements);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const checkAndUnlockAchievements = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const userId = req.user.id;
    const achievement = req.body.achievement;

    const unlockedAchievements = await checkAndUnlockAchievementsService(userId, achievement);
    res.status(200).json(unlockedAchievements);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
