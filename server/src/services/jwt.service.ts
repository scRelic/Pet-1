import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../db.js";

dotenv.config();

export const generateTokenService = (payload: object) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: "10m" });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "30d" });
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

export const saveTokensService = async (userId: number, refreshToken: string) => {
  const tokenData = await db.query("SELECT * FROM tokens WHERE user_id = $1", [userId]);

  if (tokenData.rows.length > 0) {
    return await db.query("UPDATE tokens SET refresh_token = $1 WHERE user_id = $2", [refreshToken, userId]);
  }

  return await db.query("INSERT INTO tokens (user_id, refresh_token) VALUES ($1, $2)", [userId, refreshToken]);
};

export const removeTokenService = async (refreshToken: string) => {
  const tokenData = await db.query("DELETE FROM tokens WHERE refresh_token = $1", [refreshToken]);
  return tokenData;
};

export const validateAccessTokenService = (token: string) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    return userData;
  } catch (error) {
    return null;
  }
};

export const validateRefreshTokenService = (token: string) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
    return userData;
  } catch (error) {
    return null;
  }
};

export const findTokenService = async (refreshToken: string) => {
  const tokenData = await db.query("SELECT * FROM tokens WHERE refresh_token = $1", [refreshToken]);
  return tokenData;
};
