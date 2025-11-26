import { Router } from "express";
import { getDailyIncome, getTopMenu } from "./report.controller.js";

const router = Router();

router.get("/daily-income", getDailyIncome);
router.get("/top-menu", getTopMenu);

export default router;
