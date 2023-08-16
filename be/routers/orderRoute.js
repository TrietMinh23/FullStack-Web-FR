import express from "express";
import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
  getCurrentMonthIncome,
  getMonthlyIncomeBySeller,
  getOrderBySellerId,
  updateOrderStatusToDispatched,
  getDailyIncomeBySeller,
  getDailyRefundBySeller,
  getIncomeBySellerIdForAllMonths,
  getRefundBySellerIdForAllMonths,
  getIncomeForAllMonths,
  getRefundForALlMonths,
  getIncomeForAllDeliveredOrders,
} from "../controllers/orderController.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndSeller,
} from "../middlewares/verifyToken.js";

const router = express.Router();
// seller
router.get("/income/:sellerId", getMonthlyIncomeBySeller);
router.get("/income/daily/:sellerId", getDailyIncomeBySeller);
router.get("/income/allmonth/:sellerId", getIncomeBySellerIdForAllMonths);
router.get("/refund/daily/:sellerId", getDailyRefundBySeller);
router.get("/refund/allmonth/:sellerId", getRefundBySellerIdForAllMonths);

router.get("/", verifyTokenAndAdmin, getAllOrders);
// router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

// admin
router.get("/admin/income/current", getCurrentMonthIncome);
router.get("/admin/income/allmonth", getIncomeForAllMonths);
router.get("/admin/refund/allmonth", getRefundForALlMonths);
router.get("/admin/income", getIncomeForAllDeliveredOrders);

router.get("/:userId", getOrdersByUserId);
router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", deleteOrder);
router.get("/:userId", getOrdersByUserId);
router.put("/update/:orderId", updateOrderStatusToDispatched);
router.get("/sellerId/:id", getOrderBySellerId);

export default router;
