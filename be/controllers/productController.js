import slugify from "slugify";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
import { uploadFile, deleteS3 } from "./s3Controller.js";
import util from "util";
import fs from "fs";
import mongoose from "mongoose";

export const getProductById = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findById(_id).populate({
      path: "sellerId",
      select: "name email mobile _id",
    });

    if (!product) {
      res.status(404).json({ error: "Not found!" });
      return;
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const getProductBySellerId = async (req, res) => {
  try {
    const _id = req.params.id;

    // Pagination
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const products = await Product.find({ sellerId: _id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    if (products.length === 0) {
      return res.status(400).json({ error: "No products found by seller id." });
    }

    const totalProducts = await Product.countDocuments({ sellerId: _id });

    const totalSold0 = await Product.countDocuments({ sellerId: _id, sold: 0 });
    const totalSold1 = await Product.countDocuments({ sellerId: _id, sold: 1 });

    // Calculate total price of sold products (sold 1)
    const sold1Products = await Product.find({ sellerId: _id, sold: 1 });
    const totalPriceSold1 = sold1Products.reduce(
      (total, product) => total + product.price,
      0
    );

    // Calculate total price of unsold products (sold 0)
    const sold0Products = await Product.find({ sellerId: _id, sold: 0 });
    const totalPriceSold0 = sold0Products.reduce(
      (total, product) => total + product.price,
      0
    );

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      currentPage: page,
      totalProducts,
      totalSold0,
      totalSold1,
      totalPriceSold0,
      totalPriceSold1,
      totalPages,
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.find({ slug });

    if (!product) {
      res.status(404).json({ error: "Not found!" });
      return;
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProductsByRelativeCategory = async (req, res) => {
  try {
    const categorySlug = req.query.category;
    const id = req.query.id;

    const products = await Product.aggregate([
      {
        $match: {
          category: categorySlug,
          _id: { $ne: id }, // Exclude the specified id
          sold: 0,
        },
      },
      { $sample: { size: 4 } }, // Randomly select 4 documents
      { $sort: { createdAt: -1 } }, // Sort the random documents
    ]).exec();

    if (products.length === 0) {
      res
        .status(400)
        .json({ error: "No products found for the specified category." });
      return;
    }

    res.status(200).json({
      products,
    });
    return;
  } catch (err) {
    res.status(400).json({ error: err.message });
    return;
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const categorySlug = req.query.category;

    // pagination
    var page = parseInt(req.query.page) || 1;
    var limit = 20; //numbers of products per page

    const skip = (page - 1) * limit;
    const products = await Product.find({
      category: { $in: categorySlug }, // Tìm các sản phẩm có ít nhất một phần tử nằm trong mảng categorySlugs
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    if (products.length === 0) {
      res
        .status(400)
        .json({ error: "No products found for the specified category." });
      return;
    }

    const totalProducts = await Product.find({
      category: { $in: categorySlug },
    }).countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      products: products,
      currentPage: page,
      totalPages,
      totalProducts,
    });
    return;
  } catch (err) {
    res.status(400).json({ error: err.message });
    return;
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // pagination
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 20;
    var searchQuery = req.query.searchQuery || "";

    const skip = (page - 1) * limit;

    const products = await Product.find({ sold: 0 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    if (products.length === 0) {
      res.status(400).json({ error: "No products found." });
    }

    const totalSold0 = await Product.find({ sold: 1 });
    const totalSold1 = await Product.find({ sold: 0 });
    const quantityTotalSold0 = totalSold0.length;
    const quantityTotalSold1 = totalSold1.length;

    const totalPages = Math.ceil(quantityTotalSold0 / limit);

    // Calculate total price of sold products (sold 1)
    const totalPriceSold1 = totalSold1.reduce(
      (total, product) => total + product.price,
      0
    );

    // Calculate total price of unsold products (sold 0)
    const totalPriceSold0 = totalSold0.reduce(
      (total, product) => total + product.price,
      0
    );

    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalProducts: totalPriceSold0,
      products: products,
      totalSold0: quantityTotalSold0,
      totalSold1: quantityTotalSold1,
      totalPriceSold0: totalPriceSold0,
      totalPriceSold1: totalPriceSold1,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const unlinkFile = util.promisify(fs.unlink);

export const createProduct = async (req, res) => {
  try {
    if (req.body.role === "seller") {
      res.status(400).json({ error: "You are not a seller." });
      return;
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true });

      const file = req.file;
      const url_link = await uploadFile(file);

      req.body.image = url_link;

      delete req.file;
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (req.body.role === "seller" || true) {
      const id = req.params.id;
      const product = await Product.findOne({ _id: id });

      if (!product) {
        res.status(404).json({ error: "Not found!" });
      }

      if (req.file != null) {
        const file = req.file;
        const url_link = await uploadFile(file);
        req.body.image = url_link;
        delete req.file;

        try {
          const filename = product.image.split("/").pop();
          console.log(product.image);
          const respont = await deleteS3(filename);
          console.log(respont);
        } catch (deleteError) {
          console.error("Error deleting S3 file: ", deleteError);
        }
      }

      if (req.body.title) {
        req.body.slug = slugify(req.body.title, {});
      }

      const productUpdated = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(productUpdated);
    } else {
      res.status(400).json({ error: "You are not a seller." });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    if (req.params.role === "seller" || true) {
      const id = req.params.id;

      //if the product has been delivered, seller can't delete it
      //const status = await Product.findOne({ id }).populate("status");
      // if (status === "Delivered") {
      //  res.status(400).json({ error: "You can't delete this product." });
      // } else {

      const deleteProduct = await Product.findOneAndDelete({ _id: id });
      const key = deleteProduct.image.slice(
        deleteProduct.image.lastIndexOf("/") + 1
      );

      if (!deleteProduct) {
        res.status(404).json({ error: "Not found!" });
      }

      // Delete associated image from S3
      if (key) {
        // Assuming you store S3 object key in 'imageKey' field
        await deleteS3(key);
      }
      res.status(200).json({ message: "Product deleted." });
    }
  } catch (err) {
    console.log(5);
    res.status(400).json({ error: err.message });
  }
};
