import { Router } from "express";
import { getQuestions } from "../controllers/questions.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", authMiddleware, getQuestions);

export default router;
