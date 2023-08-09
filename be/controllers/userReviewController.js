import { userReview } from "../models/userReviewModel.js";

export const getUserReview = async (req, res) => {
    try {
      const report = await userReview.find()
      .populate("buyer", "name")
      .populate("seller", "name");
      res.status(200).json(report);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
export const createReview = async (req, res) => {

    try {
        const newReport = new userReview(req.body);
        await newReport.save();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
