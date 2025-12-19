import type { Request, Response } from "express";
import { addResultUserTestService, getUserTestsService, getUserTestsCountService, getUserTestsPaginatedService } from "../services/userTest.service.js";

export const getUserTests = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const userId = req.user.id;
  try {
    const tests = await getUserTestsService(Number(userId));
    res.status(200).json(tests);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const addResultUserTest = async (req: Request, res: Response) => {
  try {
    const { test_id, score, total_questions } = req.body;
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const userId = req.user.id;

    await addResultUserTestService({ user_id: userId, test_id, score, total_questions });

    res.status(201).json({ message: "Result saved" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserTestsCount = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const userId = req.user.id;

    const count = await getUserTestsCountService(userId);
    res.status(200).json(count);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserTestsPaginated = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const userId = req.user.id;

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const response = await getUserTestsPaginatedService(Number(userId), page, limit);

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
