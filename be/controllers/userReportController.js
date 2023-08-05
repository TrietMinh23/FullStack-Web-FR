import { userReport } from "../models/userReportModel.js";
import mongoose from "mongoose";

export const getUserReport = async (req, res) => {
    try {
      const report = await userReport.find();
      res.status(200).json(report);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
export const createReport = async (req, res) => {

    try {
        const newReport = new userReport(req.body);
        await newReport.save();
        console.log(newReport);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  export const deleteReport = async (req, res) => {
    try {
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const updateReport = async (req, res) => {
    try {
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };