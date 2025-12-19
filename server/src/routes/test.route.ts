import { Router } from "express";
import { getTests } from "../controllers/test.controller.js";
const router = Router();

router.get("/", getTests);

export default router;
