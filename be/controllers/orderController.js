import {Order} from "../models/orderModel.js";
import mongoose from "mongoose";

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
    const userId = req.params.userId;

    // Pagination
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const orders = await Order.find({orderby: userId})
      .populate({
        path: "products",
        populate: {
          path: "sellerId",
          model: "User",
          select: "name",
        },
      })
      .populate("orderby", "name")
      .populate("payment", "paymentMethod")
      .populate("shipping", "address city ward")
      .sort({createAt: -1})
      .skip(skip)
      .limit(limit)
      .exec();

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    } else {
      return res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(orders.length / limit),
        orders,
      });
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const getCurrentMonthIncome = async (req, res) => {
  try {
    const income = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData",
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$productData.price" },
        },
      },
    ]);

    if (income.length > 0) {
      return res.status(200).json({ income: income[0].totalIncome });
    } else {
      return res
        .status(404)
        .json({ message: "No income available for current month." });
    }
  } catch (error) {
    console.error("Error calculating income:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while calculating income." });
  }
};

export const getCurrentYearIncome = async (req, res) => {
  try {
    const income = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
          createdAt: {
            $gte: new Date(new Date().getFullYear(), 0, 1),
          },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData",
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$productData.price" },
        },
      },
    ]);

    if (income.length > 0) {
      return res.status(200).json({ income: income[0].totalIncome });
    } else {
      return res
        .status(404)
        .json({ message: "No income available for current year." });
    }
  } catch (error) {
    console.error("Error calculating income:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while calculating income." });
  }
};


export const getIncomeForAllMonths = async (req, res) => {
  try {
    const income = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData",
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalIncome: { $sum: "$productData.price" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    if (income.length > 0) {
      return res.status(200).json({ income });
    } else {
      return res
        .status(404)
        .json({ message: "No income available for any month." });
    }
  } catch (error) {
    console.error("Error calculating income:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while calculating income." });
  }
};

export const getRefundForALlMonths = async (req, res) => {
  try {
    const refund = await Order.aggregate([
      {
        $match: {
          orderStatus: "Cancelled",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData",
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRefund: { $sum: "$productData.price" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    if (refund.length > 0) {
      return res.status(200).json({ refund });
    } else {
      return res
        .status(404)
        .json({ message: "No refund available for any month." });
    }
  } catch (error) {
    console.error("Error calculating refund:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while calculating refund." });
  }
};

export const getIncomeForAllDeliveredOrders = async (req, res) => {
  try {
    const totalIncome = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData",
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$productData.price" },
        },
      },
    ]);

    if (totalIncome.length > 0) {
      return res.status(200).json({ totalIncome: totalIncome[0].totalIncome });
    } else {
      return res
        .status(404)
        .json({ message: "No income available for delivered orders." });
    }
  } catch (error) {
    console.error("Error calculating income:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while calculating income." });
  }
};



// get Income By Seller Id For All Months
export const getIncomeBySellerIdForAllMonths = async (req, res) => {
  try {
    const {sellerId} = req.params;

    const income = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData",
      },
      {
        $match: {
          "productData.sellerId": new mongoose.Types.ObjectId(sellerId),
        },
      },
      {
        $group: {
          _id: {
            year: {$year: "$createdAt"},
            month: {$month: "$createdAt"},
          },
          totalIncome: {$sum: "$productData.price"},
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    if (income.length > 0) {
      return res.status(200).json({income});
    } else {
      return res
        .status(404)
        .json({message: "Seller not found or no income for any month."});
    }
  } catch (error) {
    console.error("Error calculating income:", error);
    return res
      .status(500)
      .json({message: "An error occurred while calculating income."});
  }
};

export const getRefundBySellerIdForAllMonths = async (req, res) => {
  try {
    const {sellerId} = req.params;

    const refund = await Order.aggregate([
      {
        $match: {
          orderStatus: "Cancelled",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData",
      },
      {
        $match: {
          "productData.sellerId": new mongoose.Types.ObjectId(sellerId),
        },
      },
      {
        $group: {
          _id: {
            year: {$year: "$createdAt"},
            month: {$month: "$createdAt"},
          },
          totalRefund: {$sum: "$productData.price"},
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    if (refund.length > 0) {
      return res.status(200).json({refund});
    } else {
      return res
        .status(404)
        .json({message: "Seller not found or no refund for any month."});
    }
  } catch (error) {
    console.error("Error calculating refund:", error);
    return res
      .status(500)
      .json({message: "An error occurred while calculating refund."});
  }
};

export const getMonthlyIncomeBySeller = async (req, res) => {
  try {
    const {sellerId} = req.params;

    const currentDate = new Date();
    const lastMonth = new Date(currentDate);
    lastMonth.setMonth(currentDate.getMonth() - 1);

    const income = await Order.aggregate([
      {
        $match: {
          createdAt: {$gte: lastMonth},
          orderStatus: "Delivered",
        },
      },
      {
        $unwind: "$products", // Unwind the products array
      },
      {
        $lookup: {
          from: "products", // The collection name for products
          localField: "products",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData", // Unwind the productData array
      },
      {
        $match: {
          "productData.sellerId": new mongoose.Types.ObjectId(sellerId),
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {$sum: "$productData.price"}, // Adjust this based on your product schema
        },
      },
    ]);

    if (income.length > 0) {
      return res.status(200).json({income: income[0].totalIncome});
    } else {
      return res
        .status(404)
        .json({message: "Seller not found or no income for the last month."});
    }
  } catch (error) {
    console.error("Error calculating income:", error);
    return res
      .status(500)
      .json({message: "An error occurred while calculating income."});
  }
};

export const getDailyIncomeBySeller = async (req, res) => {
  try {
    const {sellerId} = req.params;

    const currentDate = new Date();
    const lastDay = new Date(currentDate);
    lastDay.setDate(currentDate.getDate() - 1);

    const income = await Order.aggregate([
      {
        $match: {
          createdAt: {$gte: lastDay},
          orderStatus: "Delivered",
        },
      },
      {
        $unwind: "$products", // Unwind the products array
      },
      {
        $lookup: {
          from: "products", // The collection name for products
          localField: "products",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData", // Unwind the productData array
      },
      {
        $match: {
          "productData.sellerId": new mongoose.Types.ObjectId(sellerId),
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {$sum: "$productData.price"}, // Adjust this based on your product schema
        },
      },
    ]);

    if (income.length > 0) {
      return res.status(200).json({income: income[0].totalIncome});
    } else {
      return res
        .status(200)
        .json({ income: 0 });
    }
  } catch (error) {
    console.error("Error calculating income:", error);
    return res
      .status(500)
      .json({message: "An error occurred while calculating income."});
  }
};

export const getDailyRefundBySeller = async (req, res) => {
  try {
    const {sellerId} = req.params;

    const currentDate = new Date();
    const lastDay = new Date(currentDate);
    lastDay.setDate(currentDate.getDate() - 1);

    const refund = await Order.aggregate([
      {
        $match: {
          createdAt: {$gte: lastDay},
          orderStatus: "Cancelled",
        },
      },
      {
        $unwind: "$products", // Unwind the products array
      },
      {
        $lookup: {
          from: "products", // The collection name for products
          localField: "products",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData", // Unwind the productData array
      },
      {
        $match: {
          "productData.sellerId": new mongoose.Types.ObjectId(sellerId),
        },
      },
      {
        $group: {
          _id: null,
          totalRefund: {$sum: "$productData.price"}, // Adjust this based on your product schema
        },
      },
    ]);

    if (refund.length > 0) {
      return res.status(200).json({refund: refund[0].totalRefund});
    } else {
      return res
        .status(200)
        .json({ refund: 0 });
    }
  } catch (error) {
    console.error("Error calculating refund:", error);
    return res
      .status(500)
      .json({message: "An error occurred while calculating refund."});
  }
};

export const getOrderBySellerId = async (req, res) => {
  try {
    const sellerId = req.params.id; // Convert the sellerId to ObjectId type

    // Pagination
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate("products")
      .populate("shipping")
      .populate("payment")
      .populate("orderby")
      .sort({ createdAt: -1 });

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
      })
      .slice(skip, skip + limit);

    if (filteredOrders.length === 0) {
      return res.status(404).json({error: "No orders found for this seller."});
    }

    res
      .status(200)
      .json({
        filteredOrders,
        orderStatusCounts,
        orderStatusTotalAmounts,
        currentPage: page,
        totalPages: Math.ceil(filteredOrders.length / limit),
      });
  } catch (err) {
    console.log({error: err.message});
    res.status(500).json({error: "Internal server error"});
  }
};

const DELIVERY_TIMEOUT = 60000; // 60 seconds in milliseconds

export const updateOrderStatusToDispatched = async (req, res) => {
  try {
    const orderId = req.params.orderId; // Get the order ID from the request parameters

    // Find the order by its ID and update the status to "Dispatched"
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {orderStatus: "Dispatched"},
      {new: true} // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({error: "Order not found."});
    }

    // Set a timeout to change the order status to "Delivered" after 60 seconds
    setTimeout(async () => {
      try {
        const deliveredOrder = await Order.findByIdAndUpdate(
          orderId,
          {orderStatus: "Delivered"},
          {new: true}
        );
        if (deliveredOrder) {
          console.log("Order status updated to Delivered.");
        }
      } catch (err) {
        console.error("Error updating order status to Delivered:", err);
      }
    }, DELIVERY_TIMEOUT);

    res.status(200).json({
      message: "Order status updated to Dispatched.",
      order: updatedOrder,
    });
  } catch (err) {
    console.log({error: err.message});
    res.status(500).json({error: "Internal server error"});
  }
};
