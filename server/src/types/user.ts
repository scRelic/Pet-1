import type { IAchievement } from "./achievement.js";
import type { IFriend } from "./friend.js";

export interface IUser {
  id: number;
  email: string;
  username: string;
  description: string;
  profession: string;
  created_at: string;
  achievements: IAchievement[];
  averageScore: number;
  countTests: number;
  friends: IFriend[];
  tests: any[];
}
