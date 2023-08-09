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
} from "../controllers/productController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/:id", getProductById);
router.get("/item/:slug", getProductBySlug);
router.get("/list/search/:category", getProductsByCategory);
router.get("/", getAllProducts);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProductById);
router.get("/sellerId/:id", getProductBySellerId);

export default router;
