import express from "express";
import {
  getUsers,
  getUserByName,
  deleteUserByName,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:name", getUserByName);
router.delete("/:name", deleteUserByName);
// router.post("/register", createUser);
// router.post("/login", loginUser);
// router.get("/logout", logoutUser);

export default router;
