import mongoose from "mongoose";
import nodeCron from "node-cron";

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

productSchema.virtual('status', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'products.product',
  justOne: true, 
});

// justOne true --> return one object instead of array of objects

// delete product automatically after 24h the product has heen Delivered
nodeCron.schedule("0 0 * * *", async() => {
  try {
    const products = await Product.find({ status: "Delivered"});

    for (var i of products) {
      const day = (Date.now() - i.status.orderDate)/(3600 * 24);
      if (day >= 1) {
        await Product.findOneAndDelete(i);
      } else {
        console.log("Product is still available");
      }
    }
  } catch(err) {
    console.log(err.message);
  }
});

export const Product = mongoose.model("Product", productSchema);
