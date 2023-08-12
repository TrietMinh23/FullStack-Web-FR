import { Order } from "../models/orderModel.js";
import mongoose from "mongoose";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    // calculate total price and quantity
    newOrder.calculateTotalPrice();
    newOrder.calculateQuantity();

    await newOrder.save();

    res.status(202).json("Order has been created!", newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const id = res.params.id;
    const order = await Order.findOneAndDelete({ _id: id });

    if (!order) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(200).json("Order deleted successfully");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOneAndUpdate(
      { id },
      { $set: req.body },
      { new: true }
    );

    // calculate total price and quantity
    order.calculateTotalPrice();
    order.calculateQuantity();

    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = res.params.userId;

    const orders = await Order.find({ userId: userId })
      .populate("products.product", "title price")
      .populate("orderby", "name")
      .populate("paymentMethod", "paymentMethod")
      .populate("shippingMethod", "address city ward")
      .sort({ createAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get monthly income floor
export const getMonthlyIncome = async (req, res) => {
  const currentDate = new Date();
  const lastMonth = new Date(currentDate.getMonth() - 1);

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth },
          orderStatus: "Delivered",
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$totalPrice",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMonthlyIncomeBySeller = async (req, res) => {
  const { sellerId } = req.params;

  const currentDate = new Date();
  const lastMonth = new Date(currentDate.getMonth() - 1);

  try {
    const income = await Order.aggregate([
      {
        $match: {
          sellerId: mongoose.Type.Object(sellerId),
          createAt: { $gte: lastMonth },
          orderStatus: "Delivered",
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$totalPrice",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    console.log({ error: err.message });
  }
};

export const getOrderBySellerId = async (req, res) => {
  try {
    const sellerId = req.params.id; // Convert the sellerId to ObjectId type

    const orders = await Order.find()
      .populate("products")
      .populate("shipping")
      .populate("payment")
      .populate("orderby");

    const orderStatusCounts = {
      "Not Processed": 0,
      "Cash on Delivery": 0,
      Processing: 0,
      Dispatched: 0,
      Cancelled: 0,
      Delivered: 0,
    };

    const orderStatusTotalAmounts = {
      "Not Processed": 0,
      "Cash on Delivery": 0,
      Processing: 0,
      Dispatched: 0,
      Cancelled: 0,
      Delivered: 0,
    };

    const filteredOrders = orders
      .filter((order) =>
        order.products.some(
          (product) => product.sellerId.toString() === sellerId
        )
      )
      .map((order) => {
        orderStatusCounts[order.orderStatus]++;

        const orderTotalAmount = order.products
          .filter((product) => product.sellerId.toString() === sellerId)
          .reduce((total, product) => total + product.price, 0);

        orderStatusTotalAmounts[order.orderStatus] += orderTotalAmount;

        return {
          _id: order._id,
          products: order.products
            .filter((product) => product.sellerId.toString() === sellerId)
            .map((product) => ({
              _id: product._id,
              title: product.title,
              description: product.description,
              price: product.price,
              brandName: product.brandName,
              category: product.category,
              slug: product.slug,
              sold: product.sold,
              image: product.image,
              color: product.color,
              sellerId: product.sellerId,
              createdAt: product.createdAt,
              condition: product.condition,
            })),
          orderStatus: order.orderStatus,
          orderby: {
            mobile: order.orderby.mobile,
            name: order.orderby.name,
          },
          payment: {
            paymentMethod: order.payment.paymentMethod,
          },
          shipping: {
            address: order.shipping.address,
            city: order.shipping.city,
            district: order.shipping.district,
            ward: order.shipping.ward,
          },
          orderDate: order.orderDate,
        };
      });

    if (filteredOrders.length === 0) {
      return res
        .status(404)
        .json({ error: "No orders found for this seller." });
    }

    res
      .status(200)
      .json({ filteredOrders, orderStatusCounts, orderStatusTotalAmounts });
  } catch (err) {
    console.log({ error: err.message });
    res.status(500).json({ error: "Internal server error" });
  }
};
