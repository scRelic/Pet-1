import { Router } from "express";
import { getAllTopics } from "../controllers/topics.controller.js";

const router = Router();
router.get("/", getAllTopics);

export default router;
