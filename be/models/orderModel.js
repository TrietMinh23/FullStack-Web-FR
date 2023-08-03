import mongoose from "mongoose";

const paymentSchema = {
  paymentMethod: { type: String, required: true },
  paymentDetail: { type: Object },
};

const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  ward: { type: String, required: true },
};

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          count: Number,
          color: String,
        },
      },
    ],
    totalPrice: { type: Number },
    quantity: { type: Number },
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
      ],
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    shippingMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipping",
    },
  },
  {
    timestamp: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);
export const Shipping = mongoose.model("Shipping", shippingSchema);
export const Order = mongoose.model("Order", orderSchema);
