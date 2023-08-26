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
  getUserInformation,
  refreshTokenHandle,
  updateInformation,
  getUserById,
  updateUserById,
  countBuyer,
  get_buyer_performance_stats,
  getUserByName,
} from "../controllers/userController.js";

const router = express.Router();

// create API endpoints for buyers

router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/block/:id", blockUser);
router.put("/unblock/:id", unblockUser);
router.delete("/delete/:id", authenticationUser, deleteUser);
router.get("/user_info", getUserInformation);
router.get("/refresh_token", refreshTokenHandle);
router.post("/update_information", updateInformation);
router.get("/admin", get_buyer_performance_stats);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.get("/?:name", getUserByName);
router.get("/buyers/count", countBuyer);
export default router;
