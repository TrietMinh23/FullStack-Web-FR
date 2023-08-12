import express from "express";
import {
    getUserReview,
    createReview,
    getReviewBySellerId,
  } from "../controllers/userReviewController.js";

const router = express.Router();

// create API endpoints 

router.get("/", getUserReview);
router.get("/:id", getReviewBySellerId);
router.post("/send", createReview);
export default router;
