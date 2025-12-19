import db from "../db.js";
import type { IQuestion } from "../types/question.js";

export const getQuestionsService = async (testId: number): Promise<IQuestion[]> => {
  try {
    const result = await db.query("SELECT * FROM questions WHERE test_id = $1", [testId]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
