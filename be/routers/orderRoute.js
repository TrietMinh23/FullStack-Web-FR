import express from "express";
import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
  getMonthlyIncome,
  getMonthlyIncomeBySeller,
  getOrderBySellerId,
  updateOrderStatusToDispatched,
  getDailyIncomeBySeller,
  getDailyRefundBySeller,
  getIncomeBySellerIdForAllMonths,
  getRefundBySellerIdForAllMonths,
} from "../controllers/orderController.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndSeller,
} from "../middlewares/verifyToken.js";

const router = express.Router();
router.get("/income/:sellerId", getMonthlyIncomeBySeller);
router.get("/income/daily/:sellerId", getDailyIncomeBySeller);
router.get("/income/allmonth/:sellerId", getIncomeBySellerIdForAllMonths);
router.get("/refund/daily/:sellerId", getDailyRefundBySeller);
router.get("/refund/allmonth/:sellerId", getRefundBySellerIdForAllMonths);
router.get("/", verifyTokenAndAdmin, getAllOrders);
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);
router.get("/:userId", verifyTokenAndAuthorization, getOrdersByUserId);
router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", deleteOrder);
router.get("/:userId", getOrdersByUserId);
router.put("/update/:orderId", updateOrderStatusToDispatched);
router.get("/sellerId/:id", getOrderBySellerId);

export default router;
