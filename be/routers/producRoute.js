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
  filterProductsByPrice,
  filterProductsByCondition,
} from "../controllers/productController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/:id", getProductById);
router.get("/item/:slug", getProductBySlug);
router.get("/list/search/", getProductsByCategory);
router.get("/list/search-relative/", getProductsByRelativeCategory);
router.get("/", getAllProducts);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProductById);
router.get("/sellerId/:id", getProductBySellerId);
router.get("/filter/price", filterProductsByPrice);
router.get("/filter/condition", filterProductsByCondition);
export default router;
