import express from "express";
import { createPaymentUrl, getVnPayReturn } from "../controllers/vnpayController.js";

const router = express.Router();

// VNPAY
router.post('/create_payment_url', createPaymentUrl);
router.get('/create_payment_url', getVnPayReturn);

export default router;