import {Order} from "../models/orderModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(202).json("Order has been created!", newOrder);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const deleteOrder = async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

// admin manage update order
export const updateOrder = async (req, res) => {
  try {
    const {id} = req.params;
    const order = await Order.findOneAndUpdate(
      {id},
      {$set: req.body},
      {new: true}
    );
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const {userId} = res.params;

    const orders = await Order.find({userId})
      .populate("products.product", "title price")
      .populate("orderby", "name")
      .populate("paymentMethod", "paymentMethod")
      .populate("shippingMethod", "address city ward")
      .sort({createAt: -1}); //sorr by createAt desc
      
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};
