import express from "express";
import { loginUser, signUpUser } from "../controllers/userService.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signUpUser);

export { router };
