import db from "../db.js";
import type { IFriend } from "../types/friend.js";
import { getUserTestsCountService } from "./userTest.service.js";
import { getUserAverageScoreService } from "./user.service.js";
import { sendUserNotificationService } from "./userNotifications.service.js";

export const getFriendsService = async (userId: number): Promise<IFriend[]> => {
  try {
    const friends = await db.query(`SELECT u.id, u.username FROM user_friends f JOIN users u ON f.friend_id = u.id WHERE f.user_id = $1`, [userId]);
    return friends.rows;
  } catch (error) {
    throw error;
  }
};

export const getFriendByIdService = async (userId: number, friendId: number): Promise<IFriend> => {
  try {
    const friendRes = await db.query(`SELECT id, username, profession, description FROM users WHERE id = $1`, [friendId]);

    if (!friendRes.rows.length) {
      throw new Error("Friend not found");
    }

    const isFriendRes = await db.query(`SELECT status FROM user_friends WHERE user_id = $1 AND friend_id = $2`, [userId, friendId]);

    const friend = friendRes.rows[0] as IFriend;
    friend.status = isFriendRes.rows.length ? isFriendRes.rows[0].status : "not_friend";

    const achievementsRes = await db.query(
      `SELECT a.id, a.title, a.icon_url
       FROM user_achievements ua
       JOIN achievements a ON ua.achievement_id = a.id
       WHERE ua.user_id = $1`,
      [friendId]
    );

    friend.achievements = achievementsRes.rows ?? [];

    const testsPassed = await getUserTestsCountService(friendId);
    friend.testsPassed = testsPassed ?? 0;

    const averageScore = await getUserAverageScoreService(friendId);
    friend.averageScore = averageScore ?? null;

    return friend;
  } catch (error) {
    throw error;
  }
};

export const deleteFromFriendService = async (userId: number, friendId: number): Promise<void> => {
  try {
    await db.query(`DELETE FROM user_friends WHERE user_id = $1 AND friend_id = $2`, [userId, friendId]);
  } catch (error) {
    throw error;
  }
};

export const searchFriendService = async (userId: number, username: string): Promise<IFriend[]> => {
  try {
    if (!username || typeof username !== "string") {
      return [];
    }

    const friends = await db.query<IFriend>(
      `SELECT u.id, u.username
       FROM users u
       WHERE u.id <> $1
         AND u.username ILIKE $2
       ORDER BY u.username ASC
       LIMIT 20`,
      [userId, `%${username}%`]
    );

    return friends.rows;
  } catch (error) {
    throw error;
  }
};

export const addFriendService = async (userId: number, friendId: number): Promise<void> => {
  try {
    await db.query(`INSERT INTO user_friends (user_id, friend_id, status) VALUES ($1, $2, 'friend') ON CONFLICT DO NOTHING`, [userId, friendId]);

    const userUsernameRes = await db.query(`SELECT username FROM users WHERE id = $1`, [userId]);
    const userUsername = userUsernameRes.rows[0].username;

    await sendUserNotificationService(friendId, `Вас додано в друзі користувачем ${userUsername}.`);
  } catch (error) {
    throw error;
  }
};
