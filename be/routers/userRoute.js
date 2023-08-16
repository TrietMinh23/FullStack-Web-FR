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
router.get("/:id", getUserById);
router.put("/:id", updateUserById);

router.get("/buyers/count", countBuyer);
export default router;
