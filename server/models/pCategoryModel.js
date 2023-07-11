import mongoose from "mongoose";

const pCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    }
  }, {
    timestamp: true,
  }
);

export const PCategory = mongoose.model("PCategory", pCategorySchema);