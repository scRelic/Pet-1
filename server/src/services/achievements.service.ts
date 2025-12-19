import db from "../db.js";
import type { IAchievement } from "../types/achievement.js";

const ACHIEVEMENT = {
  1: "Complete 15 Tests",
  2: "Complete first Test",
};

export const getAchievementsService = async (): Promise<IAchievement[]> => {
  try {
    const achievements = await db.query("SELECT * FROM achievements");
    return achievements.rows;
  } catch (error) {
    throw error;
  }
};

export const checkAndUnlockAchievementsService = async (userId: number, achievement: string): Promise<{ message: string } | void> => {
  try {
    if (achievement === ACHIEVEMENT[1]) {
      const countTests = await db.query("SELECT COUNT(*) FROM user_tests WHERE user_id = $1", [userId]);
      const count = Number(countTests.rows[0].count);

      if (count >= 15) {
        await db.query("INSERT INTO user_achievements (user_id, achievement_id) VALUES ($1, $2)", [userId, 1]);
        return { message: "Achievement unlocked!" };
      }
    }

    if (achievement === ACHIEVEMENT[2]) {
      const countTests = await db.query("SELECT COUNT(*) FROM user_tests WHERE user_id = $1", [userId]);
      const count = Number(countTests.rows[0].count);

      if (count >= 1) {
        await db.query("INSERT INTO user_achievements (user_id, achievement_id) VALUES ($1, $2)", [userId, 2]);
        return { message: "Achievement unlocked!" };
      }
    }
  } catch (error) {
    throw error;
  }
};
