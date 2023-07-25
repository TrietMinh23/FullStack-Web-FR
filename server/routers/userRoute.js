import express from "express";
import {
  getUsers,
  deleteUserByID,
  createUser,
  loginUser,
  logoutUser,
  getUserByName,
} from "../controllers/userController.js";

const router = express.Router();

// create API endpoints for buyers

router.get("/", getUsers);
router.post("/register", createUser);
router.delete("/:name", deleteUserByID);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);
router.get("/:name", getUserByName);

export default router;
