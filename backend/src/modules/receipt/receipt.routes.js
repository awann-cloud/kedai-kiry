import { Router } from "express";
import { createReceipt, getReceipts } from "./receipt.controller.js";

const router = Router();

router.post("/", createReceipt);
router.get("/", getReceipts);

export default router;
