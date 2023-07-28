import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      count: Number,
      color: String,
    }
  }], 
  totalPrice: {type: Number},
  quantity: {type: Number},
  orderStatus: {
    type: String, 
    default: "Not Processed",
    enum: [
      "Not Processed",
      "Cash on Delivery",
      "Processing",
      "Dispatched",
      "Cancelled",
      "Delivered",
    ]
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  paymentMethod: {},
  shippingMethod: {},
}, {
  timestamp: true,
});

export const order = mongoose.model("Order", orderSchema);

