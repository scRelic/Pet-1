import { Router } from "express";
import { addResultUserTest, getUserTests, getUserTestsCount, getUserTestsPaginated } from "../controllers/userTest.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getUserTests);
router.get("/tests", authMiddleware, getUserTestsPaginated);
router.get("/count", authMiddleware, getUserTestsCount);
router.post("/", authMiddleware, addResultUserTest);

export default router;
