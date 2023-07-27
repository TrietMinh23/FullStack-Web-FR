import mongoose from "mongoose";
import User from "./userModel";

const sellerSchema = new mongoose.Schema(
  {
    timestamps: true,
    versionKey: false,
  }
);

sellerSchema.pre("save", (next) => {
  this.role = "seller";
  next();
});

export const Seller = User.discriminator ("Seller", sellerSchema);
