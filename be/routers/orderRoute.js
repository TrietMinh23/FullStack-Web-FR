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
} from "../controllers/orderController.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndSeller,
} from "../middlewares/verifyToken.js";

const router = express.Router();
router.get("/", verifyTokenAndAdmin, getAllOrders);
router.get("/:userId", verifyTokenAndAuthorization, getOrdersByUserId);
router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", deleteOrder);
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);
// router.get("/income/:sellerId", verifyTokenAndSeller, getMonthlyIncomeBySeller);
router.get("/income/:sellerId", getMonthlyIncomeBySeller);
router.get("/sellerId/:id", getOrderBySellerId);
router.put("/update/:orderId", updateOrderStatusToDispatched);

export default router;
