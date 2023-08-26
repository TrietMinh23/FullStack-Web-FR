import { Seller } from "../models/sellerModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwtToken.js";
import { Order } from "../models/orderModel.js";
import { userReview } from "../models/userReviewModel.js";

export const getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({ role: "seller" });
    res.status(200).json(sellers);
  } catch (err) {
    res.status(400).json({ error: err.messange });
  }
};

export const get_seller_performance_stats = async (req, res) => {
  try {
    // pagination
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 5;
    var searchQuery = req.query.searchQuery || "";
    console.log(searchQuery);
    const skip = (page - 1) * limit;
    
    const sellers = await Seller.find({ role: "seller" });
    const sellerIds = sellers.map((seller) => seller._id);

    const incomePipeline = [
      { $match: { orderStatus: "Delivered" } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productData",
        },
      },
      { $unwind: "$productData" },
      {
        $match: { "productData.sellerId": { $in: sellerIds } },
      },
      {
        $group: {
          _id: "$productData.sellerId",
          totalSales: { $sum: "$productData.price" },
        },
      },
    ];

    const sellerRatingsPipeline = [
      { $match: { seller: { $in: sellerIds } } },
      {
        $group: {
          _id: "$seller",
          positiveCount: {
            $sum: { $cond: [{ $gte: ["$rating.star", 4] }, 1, 0] },
          },
          negativeCount: {
            $sum: { $cond: [{ $lt: ["$rating.star", 4] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 1,
          averageRating: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: [
                      "$positiveCount",
                      { $multiply: ["$negativeCount", 0.5] },
                    ],
                  },
                  { $add: ["$positiveCount", "$negativeCount"] },
                ],
              },
              5,
            ],
          },
          positiveCount: "$positiveCount",
          negativeCount: "$negativeCount",
        },
      },
    ];

    const [totalSalesData, ratingsData] = await Promise.all([
      Order.aggregate(incomePipeline),
      userReview.aggregate(sellerRatingsPipeline),
    ]);

    // Calculate total positive and negative reviews for each seller
    const totalPositive = ratingsData.reduce(
      (total, item) => total + item.positiveCount,
      0
    );
    const totalNegative = ratingsData.reduce(
      (total, item) => total + item.negativeCount,
      0
    );

    
    const totalSalesMap = totalSalesData.reduce((acc, item) => {
      acc[item._id] = { totalSales: item.totalSales };
      return acc;
    }, {});

    const ratingsMap = ratingsData.reduce((acc, item) => {
      acc[item._id.toString()] = {
        totalSales: totalSalesMap[item._id.toString()]?.totalSales || 0,
        averageRating: item.averageRating,
        positiveCount: item.positiveCount,
        negativeCount: item.negativeCount,
      };
      return acc;
    }, {});

    const sellerStats = sellers.map((seller) => {
      const {
        password,
        role,
        __t,
        updatedAt,
        passwordChangeAt,
        passwordResetExpires,
        passwordResetToken,
        ...sellerData
      } = seller.toObject();

      const totalSalesInfo = totalSalesMap[seller._id.toString()] || {
        totalSales: 0,
      };
      const ratingsInfo = ratingsMap[seller._id.toString()] || {
        totalSales: 0,
        averageRating: 0,
        positiveCount: 0,
        negativeCount: 0,
      };

      return {
        ...sellerData,
        totalSales: totalSalesInfo.totalSales,
        avgRating: ratingsInfo.averageRating,
        positiveCount: ratingsInfo.positiveCount,
        negativeCount: ratingsInfo.negativeCount,
      };
    }).slice(skip, skip + limit);

    res.status(200).json({"Sellers": sellerStats, "totalPositive": totalPositive, "totalNegative": totalNegative, currentPage: page, totalPages: Math.ceil(sellers.length / limit)});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const countSellers = async (req, res) => {
  try {
    const sellerCount = await Seller.countDocuments({ role: "seller" });
    res.status(200).json({ count: sellerCount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createSeller = async (req, res) => {
  try {
    const email = req.body.email;
    const findSeller = await Seller.findOne({ email });

    if (findSeller) {
      console.log(findSeller);
      return res.status(400).json({ error: "Seller already exists" });
    }

    const newSeller = new Seller(req.body);
    await newSeller.save();

    const accessToken = generateToken(newSeller._id, "1d");
    const refreshtoken = generateToken(`${newSeller._id}fr`, "3d");
    // const refreshtoken = await generateToken(newUser._id);
    res.status(201).json({
      status: "OK",
      access_token: accessToken,
      refresh_token: refreshtoken,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.messange });
  }
};

export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findSeller = await Seller.find({ email });
    if (!findSeller) {
      return res.status(404).json({ error: "Seller doesn't exist" });
    }

    const passwordMatched = await bcrypt.compare(password, findSeller.password);
    if (!passwordMatched) {
      return res.status(400).json({ error: "Password doesn't match" });
    }

    // generate access token
    const accessToken = await generateToken(findSeller._id);

    // generate refresh token
    const refreshToken = await generateToken(findSeller._id);
    const updateUser = await Seller.findByIdAndUpdate(
      findSeller._id,
      { refreshToken: refreshToken },
      { new: true }
    );

    // cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.status(200).json({
      _id: findSeller._id,
      name: findSeller.name,
      email: findSeller.email,
      mobile: findSeller.mobile,
      token: accessToken,
    });
  } catch (err) {
    res.status(400).json({ error: err.messange });
  }
};

export const logoutSeller = async (req, res) => {
  try {
    const cookie = req.cookie;
    if (!cookie.refreshToken) {
      res.status(400).json({ message: "No refresh token in cookie" });
    }

    const refreshToken = cookie.refreshToken;
    const seller = await Seller.findOneAndUpdate({
      refreshToken: refreshToken,
    });
    if (!seller) {
      return res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
    } else {
      await Seller.findOneAndUpdate(seller._id, { refreshToken: null });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
    }

    res.status(200).json({ message: "Logout successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSellerById = async (req, res) => {
  try {
    const id = req.params.id;
    const seller = await Seller.findOne({ _id: id });

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    } else {
      res.status(200).json(seller);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateSellerById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateSeller = await Seller.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();

    if (!updateSeller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.status(200).json(updateSeller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
