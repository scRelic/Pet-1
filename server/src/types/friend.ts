import type { IAchievement } from "./achievement.js";

export interface IFriend {
  id: number;
  username: string;
  profession?: string;
  description?: string;
  email: string;
  achievements?: IAchievement[];
  testsPassed?: number | null;
  averageScore?: number | null;
  status?: FriendStatus;
}

export type FriendStatus = "friend" | "not_friend";
