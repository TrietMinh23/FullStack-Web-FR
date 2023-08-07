import express from "express";
import {
  getAllOrders,
  // getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
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

export default router;