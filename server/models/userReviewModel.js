import mongoose from "mongoose";

const userReviewSchema = new mongoose.Schema(
  {
    orderedProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      require: true,
    },
    rating: {
      star: Number,
      comment: String,
    },
    postedby: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      require: true,
      refPath: "orderedProduct.orderBy",
    },
  },
  {timestamp: true}
);

export const userReview = mongoose.model("UserReview", userReviewSchema);

