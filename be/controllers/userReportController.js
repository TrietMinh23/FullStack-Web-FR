import { userReport } from "../models/userReportModel.js";

export const getUserReport = async (req, res) => {
    try {
      const report = await userReport.find()
      .populate("id_reporter", "name")
      .populate("id_reported", "name");
      console.log(report);
      res.status(200).json(report);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
export const createReport = async (req, res) => {

    try {
        console.log("no see",req.body);
        const newReport = new userReport(req.body);
        console.log("already save");
        await newReport.save();
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
      const filter = { _id: req.body };
      const update = { status: 'Done' };
      const report = await userReport.findOneAndUpdate(filter, update);
      console.log(report);
      res.status(200).json(report);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };