import express from "express";
import {
  getUserReview,
  createReview,
  getReviewBySellerId,
  getAllReviewsBySellerId,
  countAllReview,
} from "../controllers/userReviewController.js";

const router = express.Router();

// create API endpoints

router.get("/count", countAllReview);
router.get("/", getUserReview);
router.get("/:id", getReviewBySellerId);
router.get("/all/:id", getAllReviewsBySellerId);
router.post("/send", createReview);
export default router;
