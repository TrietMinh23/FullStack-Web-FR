import express from "express";
import {
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/:id", getProductById);
router.get("/item/:slug", getProductBySlug);
router.get("/list/search/:category", getProductsByCategory);
router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProductById);

export default router;