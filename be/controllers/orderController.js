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

    // calculate total price and quantity
    newOrder.calculateTotalPrice();
    newOrder.calculateQuantity();

    await newOrder.save();

    res.status(202).json("Order has been created!", newOrder);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const id = res.params.id;
    const order = await Order.findOneAndDelete({_id: id});

    if (!order) {
      res.status(404).json({message: "Order not found"});
    } else {
      res.status(200).json("Order deleted successfully");
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const updateOrder = async (req, res) => {
  try {
    const {id} = req.params;
    const order = await Order.findOneAndUpdate(
      {id},
      {$set: req.body},
      {new: true}
    );

    // calculate total price and quantity
    order.calculateTotalPrice();
    order.calculateQuantity();

    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = res.params.userId;

    const orders = await Order.find({userId: userId})
      .populate("products.product", "title price")
      .populate("orderby", "name")
      .populate("paymentMethod", "paymentMethod")
      .populate("shippingMethod", "address city ward")
      .sort({createAt: -1});

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({error: err.message});
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
          createdAt: {$gte: lastMonth},
          orderStatus: "Delivered",
        },
      },
      {
        $project: {
          month: {$month: "$createdAt"},
          sales: "$totalPrice",
        },
      },
      {
        $group: {
          _id: "$month",
          total: {$sum: "$sales"},
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const getMonthlyIncomeBySeller = async (req, res) => {
  const {sellerId} = req.params;

  const currentDate = new Date();
  const lastMonth = new Date(currentDate.getMonth() - 1);

  try {
    const income = await Order.aggregate([
      {
        $match: {
          sellerId: mongoose.Type.Object(sellerId),
          createAt: {$gte: lastMonth},
          orderStatus: "Delivered",
        },
      },
      {
        $project: {
          month: {$month: "$createdAt"},
          sales: "$totalPrice",
        },
      },
      {
        $group: {
          _id: "$month",
          total: {$sum: "$sales"},
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    console.log({error: err.message});
  }
};
