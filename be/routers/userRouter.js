import express from "express";
import { authenticationUser } from "../middlewares/authentication.js";
import {
  getUsers,
  createUser,
  loginUser,
  logoutUser,
  blockUser,
  unblockUser,
  deleteUser,
} from "../controllers/userControllers.js";

const router = express.Router();

// create API endpoints for buyers

router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/block/:id", blockUser);
router.put("/unblock/:id", unblockUser);
router.delete("/delete/:id", authenticationUser, deleteUser);

export default router;
