import { Router } from "express";
import { getCourseStats, getDashboard } from "../controllers/dashboard.controller";

const router = Router();

router.get("/", getDashboard);
router.get("/course-stats", getCourseStats);
export default router;