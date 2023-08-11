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
    buyer: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      require: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userReview = mongoose.model("UserReview", userReviewSchema);

