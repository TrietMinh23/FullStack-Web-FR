import mongoose from "mongoose";
import nodeCron from "node-cron";

const productSchema = new mongoose.Schema(
  {
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    price: {type: Number, required: true},
    brandName: {type: String},
    category: [
      {
        type: String,
        ref: "PCategory",
        required: true,
      },
    ],
    slug: {type: String, required: true, lowercase: true, default: ""},
    sold: {type: Number, default: 0},
    image: {type: String},
    color: {type: String},
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
<<<<<<< HEAD
  ],
  slug: { type: String, required: true, lowercase: true, default: "" },
  sold: { type: Number, default: 0 },
  image: { type: String },
  color: { type: String },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
=======
>>>>>>> 7696c19a4bbbff96fc4bf5d42bf709232265482b
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.virtual("status", {
  ref: "Order",
  localField: "_id",
  foreignField: "products.product",
  justOne: true,
});

// justOne true --> return one object instead of array of objects

// delete product automatically after 24h the product has heen Delivered
nodeCron.schedule("0 0 * * *", async () => {
  try {
    const products = await Product.find({status: "Delivered"});

    for (var i of products) {
      const day = (Date.now() - i.status.orderDate) / (3600 * 24);
      if (day >= 1) {
        await Product.findOneAndDelete(i);
      } else {
        console.log("Product is still available");
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});

export const Product = mongoose.model("Product", productSchema);
