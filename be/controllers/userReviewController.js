import { userReview } from "../models/userReviewModel.js";

export const getUserReview = async (req, res) => {
    try {
      const review = await userReview.find()
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
  export const getReviewBySellerId = async (req, res) => {
    try {
      const _id = req.params.id;
      const review = await userReview.find({seller: _id })
      .populate("buyer", "name");
      if (review) {
        res.status(200).json({ review});
      } else {
        res.status(404).json({ message: "Not found!" });
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  };
  