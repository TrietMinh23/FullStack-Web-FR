import express from "express";
import {
  getAllPCategory,
  createPCategory,
  getPCategoryById,
  updatePCategory,
  deletePCategory,
} from "../controllers/pcategoryController.js";

const router = express.Router();

router.get("/", getAllPCategory);
router.post("/", createPCategory);
router.get("/:id", getPCategoryById);
router.put("/:id", updatePCategory);
router.delete("/:id", deletePCategory);
