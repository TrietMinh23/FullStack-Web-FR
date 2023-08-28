import express from "express";
import {
  getSellers,
  createSeller,
  loginSeller,
  logoutSeller,
  getSellerById,
  updateSellerById,
  countSellers,
  get_seller_performance_stats,
} from "../controllers/sellerController.js";

const router = express.Router();

// create API endpoints for seller

router.get("/", getSellers);
router.get("/count", countSellers);
router.post("/register", createSeller);
router.post("/login", loginSeller);
router.delete("logout", logoutSeller);
router.get("/admin", get_seller_performance_stats);
router.get("/:id", getSellerById);
router.put("/:id", updateSellerById);


export default router;
