import slugify from "slugify";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
import { uploadFile, deleteS3 } from "./s3Controller.js";
import util from "util";
import fs from "fs";

export const getProductById = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.find({ _id });
    const shop = await User.find({ _id: product[0].sellerId });
    if (product) {
      res.status(200).json({ product: product[0], shop: shop[0].name });
    } else {
      res.status(404).json({ message: "Not found!" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const getProductBySellerId = async (req, res) => {
  try {
    const _id = req.params.id;

    // pagination
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const products = await Product.find({ sellerId: _id })
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    if (products.length === 0) {
      res.status(400).json({ error: "No products found by seller id." });
    }

    const totalProducts = await Product.find({
      sellerId: _id,
    }).countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      currentPage: page,
      totalProducts,
      totalPages,
      products: products,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.find({ slug });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Not found!" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const categorySlug = req.params.category;

    const category = await Product.findOne({ slug: categorySlug });
    if (!category) {
      res.status(404).json({ error: "Not found!" });
    }

    // pagination
    var page = parseInt(req.params.page) || 1;
    var limit = parseInt(res.params.limit) || 20; //numbers of products per page

    const skip = (page - 1) * limit;
    var products = await Product.find({ category: category })
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
      category: category,
    }).countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      currentPage: page,
      totalPages,
      totalProducts,
    });
    return;
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // pagination
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;
    const products = await Product.find()
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    if (products.length === 0) {
      res.status(400).json({ error: "No products found." });
    }

    const totalProducts = await Product.find().countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      currentPage: page,
      totalProducts,
      totalPages,
      products: products,
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

      req.body.category = req.body.category.map((category) => category.trim());

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
      const { id } = req.params;
      const product = await Product.findOneAndUpdate({ id });

      if (!product) {
        res.status(404).json({ error: "Not found!" });
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

// delete product by seller
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
