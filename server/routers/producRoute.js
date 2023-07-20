import express from "express";
import {
  getProductById,
  getProductBySlug,
  getListByCategory,
  getAllProducts,
  createProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/:id", getProductById);
router.get("/item/:slug", getProductBySlug);
router.get("/list/search/:category", getListByCategory);
router.get("/", getAllProducts);
router.post("/", createProduct);

export default router;