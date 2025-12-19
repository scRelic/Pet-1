import { getQuestionsService } from "../services/questions.service.js";
import type { Request, Response } from "express";

export const getQuestions = async (req: Request, res: Response) => {
  const testId = parseInt(req.query.testId as string, 10);
  try {
    const questions = await getQuestionsService(testId);
    res.status(200).json(questions);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
