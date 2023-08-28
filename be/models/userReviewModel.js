import mongoose from "mongoose";

const userReviewSchema = new mongoose.Schema(
  {
    orderedProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    rating: {
      star: Number,
      comment: String,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userReview = mongoose.model("UserReview", userReviewSchema);

