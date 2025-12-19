import type { Request, Response, NextFunction } from "express";
import { validateAccessTokenService } from "../services/jwt.service.js";

interface IUserPayload {
  id: number;
  email: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "Відсутній заголовок авторизації" });

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Відсутній токен" });

    const userData = validateAccessTokenService(token) as IUserPayload | null;

    if (!userData) return res.status(401).json({ message: "Некоректний токен" });

    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Помилка авторизації" });
  }
};
