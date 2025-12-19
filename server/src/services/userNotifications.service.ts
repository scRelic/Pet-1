import db from "../db.js";
import type { INotification } from "../types/notification.js";

export const getUserNotificationsService = async (userId: number, limit = 6, offset = 0): Promise<INotification[]> => {
  try {
    const notifications = await db.query(`SELECT * FROM user_notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`, [
      userId,
      limit,
      offset,
    ]);
    return notifications.rows;
  } catch (error) {
    throw error;
  }
};

export const deleteUserNotificationService = async (userId: number, notificationId: number): Promise<void> => {
  try {
    await db.query(`DELETE FROM user_notifications WHERE id = $1 AND user_id = $2`, [notificationId, userId]);
    return;
  } catch (error) {
    throw error;
  }
};

export const markNotificationAsReadService = async (userId: number, notificationId: number): Promise<void> => {
  try {
    await db.query(`UPDATE user_notifications SET is_read = TRUE WHERE id = $1 AND user_id = $2`, [notificationId, userId]);
    return;
  } catch (error) {
    throw error;
  }
};

export const sendUserNotificationService = async (userId: number, content: string): Promise<void> => {
  try {
    await db.query(`INSERT INTO user_notifications (user_id, message, is_read, created_at) VALUES ($1, $2, FALSE, NOW())`, [userId, content]);
    return;
  } catch (error) {
    throw error;
  }
};
