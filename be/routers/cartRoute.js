import express from "express";
import {
  getAllCarts,
  getCartByUserId,
  createCart,
  updateCart,
  clearAllUserCart,
  updateUserCart,
  deleteProductFromListUser,
} from "../controllers/cartController.js";
// import {
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
// } from "../middlewares/verifyToken.js";

const router = express.Router();

//router.get("/:userId", verifyTokenAndAuthorization, getCartByUserId);
router.get("/:userId", getCartByUserId);
router.post("/", createCart);
router.put("/:id", updateCart);
// router.delete("/:id", deleteCart);
router.get("/", getAllCarts);
router.post("/clear_all_cart/:idCart", clearAllUserCart);
router.post("/update_cart", updateUserCart);
router.post("/list_remove", deleteProductFromListUser);

export default router;
