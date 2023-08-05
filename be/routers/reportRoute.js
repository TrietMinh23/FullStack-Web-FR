import express from "express";
import {
    getUserReport,
    createReport,
  } from "../controllers/userReportController.js";

const router = express.Router();

// create API endpoints 

router.get("/", getUserReport);
router.post("/send", createReport);

export default router;
