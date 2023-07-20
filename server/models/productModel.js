import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {type: String, require: true, trim: true},
  description: {type: String, require: true, trim: true},
  price: {type: Number, require: true},
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PCategory",
    require: true,
  },
  slug: {type: String, require: true, unique: true, lowercase: true},
  quantity: {type: Number, require: true},
  sold: {type: Number, default: 0},
  image: [
    {
      public_id: String,
      url: String,
    },
  ],
  color: [],
  sellerId: {type: mongoose.Schema.Types.ObjectId, ref: "Seller", require: true},
});

export const Product = mongoose.model("Product", productSchema);
