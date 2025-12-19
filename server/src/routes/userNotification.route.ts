import { Router } from "express";
import { getUserNotifications, deleteUserNotification, markNotificationAsRead } from "../controllers/userNotification.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getUserNotifications);
router.put("/:id/read", authMiddleware, markNotificationAsRead);
router.delete("/:id", authMiddleware, deleteUserNotification);

export default router;
