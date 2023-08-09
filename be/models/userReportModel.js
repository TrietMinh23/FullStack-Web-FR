import mongoose from "mongoose";

const userReportSchema = new mongoose.Schema(
  { 
    orderedProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      require: true,
    },
    title:{type: String, required: true},
    details:{type: String, required: true},
    id_reporter: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      require: true,
    },
    id_reported: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      require: true,
    },
    status: {type: String, required: true}
  },
  {timestamps: true}
);

export const userReport = mongoose.model("UserReport", userReportSchema);

