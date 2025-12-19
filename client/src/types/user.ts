import type { IAchievement } from "./achievement";
import type { IFriend } from "./friend";

export interface IUser {
  id: number;
  email: string;
  username: string;
  created_at: string;
  description: string;
  profession: string;
  achievements: IAchievement[];
  countTests: number;
  averageScore: number;
  level: number;
  exp: number;
  friends: IFriend[];
  tests: any[];
}
