import mongoose from "mongoose";
import User from "./userModel";

const sellerSchema = new mongoose.Schema(
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Seller = User.discriminator ("Seller", sellerSchema);
