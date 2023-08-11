import { Cart } from "../models/cartModel.js";

export const getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne(
      { userId: userId },
      "products totalPrice _id"
    );
    await cart
      .populate({
        path: "products.product",
        model: "Product",
        populate: {
          path: "sellerId",
          select: "name email mobile _id",
        },
      })
      .then((res) => res)
      .catch((err) => console.log(err));
    let tempProducts = cart.products;
    let filterTempProducts = tempProducts.map((item) => item.product);
    let productSelectField = {
      _id: cart._id,
      totalPrice: cart.totalPrice,
      products: filterTempProducts,
    };
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
    } else {
      res.status(200).json(productSelectField);
    }
  } catch (err) {
    console.error({ error: err.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);

    // calculate total price and quantity
    newCart.calculateTotalPrice();
    newCart.setQuantity();

    await newCart.save();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findOne({ _id: id });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    } else {
      // update total price and quantity
      cart.calculateTotalPrice();
      cart.setQuantity();

      await cart.save();
      res.status(200).json(cart);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findOneAndDelete({ _id: id });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    } else {
      res.status(200).json("Cart deleted successfully");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
