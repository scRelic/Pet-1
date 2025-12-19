import { getFriendsService, getFriendByIdService, deleteFromFriendService, searchFriendService, addFriendService } from "../services/userFriends.service.js";
import type { Request, Response } from "express";

export const getFriends = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const userId = req.user.id;

    const friends = await getFriendsService(userId);

    res.status(200).json(friends);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFriendById = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const friendId = parseInt(req.params.id as string, 10);
    const userId = req.user.id;

    const friend = await getFriendByIdService(userId, friendId);
    if (!friend) {
      return res.status(404).json({ message: "Friend not found1" });
    }
    res.status(200).json(friend);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFromFriend = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const friendId = parseInt(req.params.id as string, 10);
    const userId = req.user.id;
    await deleteFromFriendService(userId, friendId);
    res.status(200).json({ message: "Friend deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const searchFriend = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const username = req.query.username as string;
    const userId = req.user.id;

    const friends = await searchFriendService(userId, username);

    if (!friends || friends.length === 0) {
      return res.status(200).json({ message: "Такого користувача не знайдено", data: null });
    }

    res.status(200).json(friends);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addFriend = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const friendId = parseInt(req.params.id as string, 10);
    const userId = req.user.id;

    await addFriendService(userId, friendId);
    res.status(200).json({ message: "Friend added successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
