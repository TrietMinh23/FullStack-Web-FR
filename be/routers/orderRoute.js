import express from "express";
import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getMonthlyIncome,
  getMonthlyIncomeBySeller,
  getOrderBySellerId,
} from "../controllers/orderController.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndSeller,
} from "../middlewares/verifyToken.js";

const router = express.Router();
router.get("/", verifyTokenAndAdmin, getAllOrders);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrders); 
router.post("/",   verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin,updateOrder);
router.delete("/:id", verifyTokenAndAdmin ,deleteOrder);
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);
// router.get("/income/:sellerId", verifyTokenAndSeller, getMonthlyIncomeBySeller);
router.get("/income/:sellerId", getMonthlyIncomeBySeller);
router.get("/sellerId/:id", getOrderBySellerId);

export default router;