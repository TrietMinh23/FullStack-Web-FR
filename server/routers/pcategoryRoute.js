import express from "express";
import {
  getPCategories,
  createPCategory,
  getPCategoryById,
  updatePCategory,
  deletePCategory,
} from "../controllers/pcategoryController.js";

const router = express.Router();

router.get("/", getPCategories);
router.post("/", createPCategory);
router.get("/:id", getPCategoryById);
router.put("/:id", updatePCategory);
router.delete("/:id", deletePCategory);

export default router;