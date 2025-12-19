import type { Request, Response } from "express";
import { loginService, registerService, logoutService, refreshService } from "../services/auth.service.js";
import { registerSchema } from "../validators/user.validator.js";

export const register = async (req: Request, res: Response) => {
  const { email, username, password, confirmPassword } = req.body;
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid payload", details: parsed.error.format() });
    }

    const userData = await registerService({ email, username, password });

    res.cookie("refreshToken", userData.tokens.refresh_token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.status(201).json({ message: "Користувач успішно зареєстрований" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userData = await loginService({ email, password });

    res.cookie("refreshToken", userData.tokens.refresh_token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.status(200).json({
      accessToken: userData.tokens.access_token,
      user: {
        id: userData.user.id,
        email: userData.user.email,
        username: userData.user.username,
      },
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(req.cookies);
  try {
    const token = await logoutService(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Користувач успішно вийшов" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    const userData = await refreshService(refreshToken);

    res.cookie("refreshToken", userData.tokens.refresh_token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.status(201).json({
      message: "Успішно оновлено токени",
      accessToken: userData.tokens.access_token,
      user: {
        id: userData.user.id,
        email: userData.user.email,
        username: userData.user.username,
      },
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
