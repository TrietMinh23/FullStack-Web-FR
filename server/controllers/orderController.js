import {Order} from "../models/orderModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}

export const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({error: "Not found!"});
    } 

    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const createOrder = async (req, res) => {
  try {
   
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};