import type { IAchievement } from "./achievement.js";

export interface IFriend {
  id: number;
  username: string;
  profession: string;
  description: string;
  email: string;
  achievements: IAchievement[] | [];
  testsPassed: number | null;
  averageScore: number | null;
  is_online?: boolean;
  status: "friend" | "not_friend";
}
