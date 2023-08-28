import mongoose from "mongoose";

const paymentSchema = {
  paymentMethod: { type: String, required: true },
  paymentDetail: { type: Object, default: null },
};

const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  ward: { type: String, required: true },
};

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
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
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    shipping: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipping",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

orderSchema.methods.calculateTotalPrice = async function () {
  this.totalPrice = 0;
  for (const item of this.products) {
    this.totalPrice += item.price;
  }
  await this.save();
  return this.totalPrice;
};

orderSchema.methods.calculateQuantity = async function () {
  this.quantity = this.products.length;
};

export const Payment = mongoose.model("Payment", paymentSchema);
export const Shipping = mongoose.model("Shipping", shippingSchema);
export const Order = mongoose.model("Order", orderSchema);
