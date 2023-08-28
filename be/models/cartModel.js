import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, default: 0 }, //number of product
      },
    ],
    totalPrice: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

cartSchema.method.calculateTotalPrice = async () => {
  this.totalPrice = 0;
  for (var product of this.products) {
    this.totalPrice += product.product.price;
  }
};

cartSchema.method.setQuantity = async () => {
  this.quantity = this.products.length;
};

export const Cart = mongoose.model("Cart", cartSchema);
