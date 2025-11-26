import { Router } from "express";
import {
  getAllMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
} from "./menu.controller.js";

const router = Router();

router.get("/", getAllMenu);
router.get("/:id", getMenuById);
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

export default router;
