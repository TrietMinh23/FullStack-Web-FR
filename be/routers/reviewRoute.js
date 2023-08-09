import express from "express";
import {
    getUserReview,
    createReview,
  } from "../controllers/userReviewController.js";

const router = express.Router();

// create API endpoints 

router.get("/", getUserReview);
router.post("/send", createReview);
export default router;
