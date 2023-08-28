import express from "express";
import {
  createPaymentUrl,
  getVnPayReturn,
  paymentCash,
} from "../controllers/vnpayController.js";

const router = express.Router();

// VNPAY
router.post("/create_payment_url", createPaymentUrl);
router.get("/create_payment_url", getVnPayReturn);
router.post("/payment-cash", paymentCash);

export default router;
