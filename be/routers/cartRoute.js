import express from "express";
import {
  getAllCarts,
  getCartByUserId,
  createCart,
  updateCart,
  deleteCart,
  clearAllUserCart,
} from "../controllers/cartController.js";
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middlewares/verifyToken.js";

const router = express.Router();

//router.get("/:userId", verifyTokenAndAuthorization, getCartByUserId);
router.get("/:userId", getCartByUserId);
router.post("/", verifyTokenAndAuthorization, createCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/", verifyTokenAndAdmin, getAllCarts);
router.post("/clear_all_cart/:idCart", clearAllUserCart);

export default router;
