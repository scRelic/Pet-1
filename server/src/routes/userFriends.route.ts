import { Router } from "express";
import { getFriends, getFriendById, deleteFromFriend, searchFriend, addFriend } from "../controllers/userFriends.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getFriends);
router.get("/search", authMiddleware, searchFriend);
router.get("/:id", authMiddleware, getFriendById);
router.post("/:id", authMiddleware, addFriend);
router.delete("/:id", authMiddleware, deleteFromFriend);

export default router;
