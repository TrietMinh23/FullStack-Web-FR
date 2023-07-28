import express from "express";
import {
  getUsers,
  deleteUserByID,
  createUser,
  loginUser,
  logoutUser,
  blockUser,
  unblockUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// create API endpoints for buyers

router.get("/", getUsers);
router.post("/register", createUser);
router.delete("/:id", deleteUserByID);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);
router.put("/blockUser/:id", blockUser);
router.put("unblockUser/:id", unblockUser);
router.delete("/deleteUser/:id", deleteUser);\

export default router;
