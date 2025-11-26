import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateRole
} from "./user.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id/role", updateRole);

export default router;
