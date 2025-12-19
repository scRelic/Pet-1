import db from "../db.js";
import type { IUser } from "../types/user.js";
import type { IAchievement } from "../types/achievement.js";
import { getUserTestsCountService } from "./userTest.service.js";
import { getFriendsService } from "./userFriends.service.js";

export const getProfileService = async (userId: number): Promise<IUser> => {
  try {
    const user = (await db.query("SELECT id, email, username, description, profession, created_at FROM users WHERE id = $1", [userId])).rows[0];

    const newUser = await addNewDataToUserService(userId, user);

    return { ...newUser };
  } catch (error) {
    throw error;
  }
};

export const updateProfileService = async (userId: number, updatedData: Partial<IUser>): Promise<IUser> => {
  try {
    const fields = [];
    const values = [];
    let index = 1;

    if (updatedData.email) {
      const foundEmail = await db.query("SELECT email FROM users WHERE email = $1 AND id != $2", [updatedData.email, userId]);
      if (foundEmail.rows.length > 0) throw new Error("Користувач з таким email вже існує.");

      fields.push(`email = $${index++}`);
      values.push(updatedData.email);
    }

    if (updatedData.username) {
      const foundUsername = await db.query("SELECT username FROM users WHERE username = $1 AND id != $2", [updatedData.username, userId]);
      if (foundUsername.rows.length > 0) throw new Error("Користувач з таким іменем вже існує.");

      fields.push(`username = $${index++}`);
      values.push(updatedData.username);
    }

    if (updatedData.description) {
      fields.push(`description = $${index++}`);
      values.push(updatedData.description);
    }

    if (updatedData.profession) {
      fields.push(`profession = $${index++}`);
      values.push(updatedData.profession);
    }
    values.push(userId);

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${index} RETURNING id, email, username, description, profession, created_at`;
    const result = await db.query(query, values);

    const newUser = await addNewDataToUserService(userId, result.rows[0]);

    return newUser;
  } catch (error) {
    throw error;
  }
};

export const getUserAchievementsService = async (userId: number): Promise<IAchievement[]> => {
  try {
    const achievements = await db.query(
      `SELECT a.id, a.title, ua.achieved_at, a.icon_url
      FROM user_achievements ua
      JOIN achievements a ON ua.achievement_id = a.id
      WHERE ua.user_id = $1`,
      [userId]
    );
    return achievements.rows.map((row) => {
      return {
        id: row.id,
        title: row.title,
        icon_url: row.icon_url,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getUserAverageScoreService = async (userId: number): Promise<number> => {
  try {
    const result = await db.query(`SELECT AVG(score::float / total_questions * 100) AS average_percent FROM user_tests WHERE user_id = $1`, [userId]);
    const avg = result.rows[0].average_percent;
    return avg !== null ? Math.round(avg * 10) / 10 : 0;
  } catch (error) {
    throw error;
  }
};

const addNewDataToUserService = async (userId: number, user: IUser): Promise<IUser> => {
  const achievements = await getUserAchievementsService(userId);
  const averageScore = await getUserAverageScoreService(userId);
  const countTests = await getUserTestsCountService(userId);
  const friends = await getFriendsService(userId);

  user.achievements = achievements;
  user.averageScore = averageScore;
  user.countTests = countTests;
  user.friends = friends;

  return user;
};
