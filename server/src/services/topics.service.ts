import db from "../db.js";

export const getAllTopicsService = async () => {
  try {
    const topics = await db.query("SELECT * FROM topics");
    return topics.rows;
  } catch (error) {
    throw error;
  }
};
