import express from "express";
import {
    getUserReport,
    createReport,
    updateReport,
  } from "../controllers/userReportController.js";

const router = express.Router();

// create API endpoints 

router.get("/", getUserReport);
router.post("/send", createReport);
router.post("/update", updateReport);

export default router;
