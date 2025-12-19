import db from "../db.js";
import bcrypt from "bcrypt";
import type { IUser } from "../types/user.js";

interface IRegisterData {
  email: string;
  username: string;
  password: string;
}

interface ILoginData {
  email: string;
  password: string;
}

import { generateTokenService, saveTokensService, removeTokenService, validateRefreshTokenService, findTokenService } from "./jwt.service.js";

export const registerService = async (data: IRegisterData) => {
  const { email, username, password } = data;
  try {
    const userExists: any = await db.query("SELECT * FROM users WHERE email = $1 OR username = $2", [email, username]);

    if (userExists.rows.length > 0) {
      throw new Error("Користувач уже існує");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.query("INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id, email, username", [
      email,
      username,
      hashedPassword,
    ]);

    const tokens = generateTokenService({ id: user.rows[0].id, email: user.rows[0].email, username: user.rows[0].username });

    await saveTokensService(user.rows[0].id, tokens.refresh_token);

    return { user: user.rows[0], tokens };
  } catch (error) {
    throw error;
  }
};

export const loginService = async (data: ILoginData) => {
  const { email, password } = data;

  try {
    const found = await db.query("SELECT id, email, username, password FROM users WHERE email = $1", [email]);
    if (!found.rows.length) throw new Error("Невірні дані");

    const user = found.rows[0];

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw new Error("Невірні дані");

    const tokens = generateTokenService({ id: user.id, email: user.email, username: user.username });
    await saveTokensService(user.id, tokens.refresh_token);

    return { user: user, tokens };
  } catch (error) {
    throw error;
  }
};

export const logoutService = async (refresh_token: string) => {
  try {
    const token = await removeTokenService(refresh_token);
    return token;
  } catch (error) {
    throw error;
  }
};

export const refreshService = async (refresh_token: string) => {
  try {
    if (!refresh_token) {
      throw new Error("Відсутній токен. Авторизуйтесь заново");
    }

    const userData: any = validateRefreshTokenService(refresh_token);
    const tokenFromDb = await findTokenService(refresh_token);

    if (!userData || tokenFromDb.rows.length === 0) {
      throw new Error("Некоректний токен. Авторизуйтесь заново");
    }

    const user = await db.query("SELECT id, email, username FROM users WHERE id = $1", [userData.id]);
    const tokens = generateTokenService({ id: user.rows[0].id, email: user.rows[0].email, username: user.rows[0].username });
    await saveTokensService(user.rows[0].id, tokens.refresh_token);

    return { user: user.rows[0], tokens };
  } catch (error) {
    throw error;
  }
};
