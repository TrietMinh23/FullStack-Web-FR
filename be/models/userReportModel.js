import mongoose from "mongoose";

const userReportSchema = new mongoose.Schema(
  { 
    orderedProduct: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    title:{type: String, required: true},
    details:{type: String, required: true},
    id_reporter: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    id_reported: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    status: {type: String, required: true},
  },
  {timestamps: true}
);

export const userReport = mongoose.model("UserReport", userReportSchema);

