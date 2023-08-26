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
      var page = parseInt(req.query.page) || 1;
      var limit = parseInt(req.query.limit) || 20;
      var searchQuery = req.query.searchQuery || "";
      console.log(searchQuery);
      
      const skip = (page - 1) * limit;

      const _id = req.params.id;

      const review = await userReview.find({seller: _id })
      .populate("buyer", "name")
      .skip(skip)
      .limit(limit)
      .exec();

      const totalReview = await userReview.find({ seller: _id}).countDocuments();
      const totalPages = Math.ceil(totalReview / limit);

      const totalStar1 = await userReview.countDocuments({ seller: _id, 'rating.star': 1 });
      const totalStar2 = await userReview.countDocuments({ seller: _id, 'rating.star': 2 });
      const totalStar3 = await userReview.countDocuments({ seller: _id, 'rating.star': 3 });
      const totalStar4 = await userReview.countDocuments({ seller: _id, 'rating.star': 4 });
      const totalStar5 = await userReview.countDocuments({ seller: _id, 'rating.star': 5 });
      const Avg = (totalStar5 * 5 + totalStar4 * 4 + totalStar3 *3 + totalStar2 * 2 + totalStar1 )/ totalReview
      const AvgStar = parseFloat(Avg.toFixed(1))
      if (review) {
        res.status(200).json({ 
          review,
          currentPage: page,
          totalReview,
          totalPages,
          totalStar1,
          totalStar2,
          totalStar3,
          totalStar4,
          totalStar5,
          AvgStar
        });
      } else {
        res.status(404).json({ message: "Not found!" });
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  };
  
  export const getAllReviewsBySellerId = async (req, res) => {
    try {
      const _id = req.params.id;
      const review = await userReview.find({seller: _id })
      .populate("buyer", "name")
      const totalReview = await userReview.find({ seller: _id}).countDocuments();
      
      const totalStar1 = await userReview.countDocuments({ seller: _id, 'rating.star': 1 });
      const totalStar2 = await userReview.countDocuments({ seller: _id, 'rating.star': 2 });
      const totalStar3 = await userReview.countDocuments({ seller: _id, 'rating.star': 3 });
      const totalStar4 = await userReview.countDocuments({ seller: _id, 'rating.star': 4 });
      const totalStar5 = await userReview.countDocuments({ seller: _id, 'rating.star': 5 });
      const Avg = (totalStar5 * 5 + totalStar4 * 4 + totalStar3 *3 + totalStar2 * 2 + totalStar1 )/ totalReview
      const AvgStar = parseFloat(Avg.toFixed(1))
      if (review) {
        res.status(200).json({ 
          review,
          totalReview,
          totalStar1,
          totalStar2,
          totalStar3,
          totalStar4,
          totalStar5,
          AvgStar
        });
      } else {
        res.status(404).json({ message: "Not found!" });
      }
    } catch (err) {
      res.json({ message: "noooooo"});
    }
  };

  export const countAllReview = async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const review = await userReview.find({
        createdAt: { $gte: today },
      })

      // Count positive and negative reviews
      let positiveCount = 0;
      let negativeCount = 0;
  
      review.forEach((r) => {
        if (r.rating.star >= 4) {
          positiveCount++;
        } else if (r.rating.star <= 2) {
          negativeCount++;
        }
      });
  
      res.status(200).json({
        positiveCount,
        negativeCount,
      });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };