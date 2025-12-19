import { getTestsService } from "../services/test.service.js";
import type { Request, Response } from "express";
import { validateAccessTokenService } from "../services/jwt.service.js";

export const getTests = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const sort = (req.query.sort as string) || "random";
    const search = req.query.search as string;
    const topic = req.query.topic as string;
    const difficulty = req.query.difficulty as string;
    const status = req.query.status as string;

    let tests;
    let userId = null;

    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        const userData = validateAccessTokenService(token) as { id: number } | null;
        if (userData) {
          userId = userData.id;
        }
      }
    }

    if (userId !== null) {
      tests = await getTestsService(userId, sort, search, topic, difficulty, status, page, 12);
    } else {
      tests = await getTestsService(undefined, sort, search, topic, difficulty, status, page, 12);
    }

    res.status(200).json(tests);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
