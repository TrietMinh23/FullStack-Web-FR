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

export const getOrderBySellerId = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    const orders = await Order.find({"products.product.sellerId":sellerId}).populate({
      path: "products.product",
    })
    .sort({createdAt: -1})
    .exec();

    if (orders.length === 0) {
      return res.status(404).json({ error: "No orders found for this seller." });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.log({error: err.message});
  }
}