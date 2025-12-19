import type { Request, Response } from "express";
import { getUserNotificationsService, deleteUserNotificationService, markNotificationAsReadService } from "../services/userNotifications.service.js";

export const getUserNotifications = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const userId = req.user.id;
  const limit = parseInt(req.query.limit as string) || 6;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const notifications = await getUserNotificationsService(userId, limit, offset);
    res.status(200).json(notifications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserNotification = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const userId = req.user.id;

  if (!req.params.id) return res.status(400).json({ error: "Notification ID is required" });
  const notificationId = parseInt(req.params.id, 10);

  try {
    await deleteUserNotificationService(userId, notificationId);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const userId = req.user.id;

  if (!req.params.id) return res.status(400).json({ error: "Notification ID is required" });
  const notificationId = parseInt(req.params.id, 10);

  try {
    await markNotificationAsReadService(userId, notificationId);
    res.status(200).json({ message: "Notification marked as read successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
