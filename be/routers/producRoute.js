import express from "express";
import {
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProductById,
  getProductBySellerId,
  getProductsByRelativeCategory,
} from "../controllers/productController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/:id", getProductById);
router.get("/item/:slug", getProductBySlug);
router.get("/list/search/:category", getProductsByCategory);
router.get("/list/search-relative/:category", getProductsByRelativeCategory);
router.get("/", getAllProducts);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProductById);
router.get("/sellerId/:id", getProductBySellerId);

export default router;
