import { getAllTopicsService } from "../services/topics.service.js";
import type { Request, Response } from "express";

export const getAllTopics = async (req: Request, res: Response) => {
  try {
    const topics = await getAllTopicsService();
    res.status(200).json(topics);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
