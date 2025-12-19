import { getProfileService, updateProfileService, getUserAchievementsService, getUserAverageScoreService } from "../services/user.service.js";
import type { Request, Response } from "express";
import { updateUserSchema } from "../validators/user.validator.js";

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const userId = req.user.id;

    const user = await getProfileService(userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const userId = req.user.id;

  const parsed = updateUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.format() });
  }

  try {
    const updatedUser = await updateProfileService(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to update user" });
  }
};

export const getUserAchievements = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const userId = req.user.id;

    const achievements = await getUserAchievementsService(userId);
    res.status(200).json(achievements);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserAverageScore = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const userId = req.user.id;

    const averageScore = await getUserAverageScoreService(userId);
    res.status(200).json({ averageScore });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
