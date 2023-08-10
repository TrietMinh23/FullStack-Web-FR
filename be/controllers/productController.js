import slugify from "slugify";
import {Product} from "../models/productModel.js";
import {User} from "../models/userModel.js";
import {uploadFile} from "./s3Controller.js";
import util from "util";
import fs from "fs";

export const getProductById = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findOne({id});

    if (!product) {
      res.status(404).json({error: "Not found!"});
      return;
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.json({message: err.message});
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.find({slug});

    if (!product) {
      res.status(404).json({error: "Not found!"});
      return;
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const categorySlug = req.params.category;

    const category = await Product.findOne({slug: categorySlug});
    if (!category) {
      res.status(404).json({error: "Not found!"});
      return;
    }

    // pagination
    var page = parseInt(req.params.page) || 1;
    var limit = parseInt(res.params.limit) || 20; //numbers of products per page

    const skip = (page - 1) * limit;
    var products = await Product.find({category: category})
      .sort({createdAt: -1})
      .skip(skip)
      .limit(limit)
      .exec();

    if (products.length === 0) {
      res
        .status(400)
        .json({error: "No products found for the specified category."});
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
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // pagination
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;
    const products = await Product.find()
      .sort({createAt: -1})
      .skip(skip)
      .limit(limit)
      .exec();

    if (products.length === 0) {
      res.status(400).json({error: "No products found."});
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
    res.status(400).json({error: err.message});
  }
};

const unlinkFile = util.promisify(fs.unlink);

export const createProduct = async (req, res) => {
  try {
    if (req.body.role === "seller") {
      res.status(400).json({error: "You are not a seller."});
      return;
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title, {lower: true});

      const file = req.file;
      const url_link = await uploadFile(file);

      req.body.image = url_link;

      delete req.file;

      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    }

    const file = req.file;
    console.log(file);
    const title = req.body.title;
    console.log(title);
  } catch (err) {
    res.status(400).json({error: err.message});
    console.log(err);
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (req.body.role === "seller") {
      const id = req.params.id;
      const product = await Product.findOneAndUpdate({id});

      if (!product) {
        res.status(404).json({error: "Not found!"});
      }

      if (req.body.title) {
        req.body.slug = slugify(req.body.title, {});
      }

      const productUpdated = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(productUpdated);
    } else {
      res.status(400).json({error: "You are not a seller."});
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

// delete product by seller
export const deleteProductById = async (req, res) => {
  try {
    if (req.params.role === "seller") {
      const id = req.params.id;

      // if the product has been delivered, seller can't delete it
      const status = await Product.findOne({id}).populate("status");
      if (status === "Delivered") {
        res.status(400).json({error: "You can't delete this product."});
      } else {
        const deleteProduct = await Product.findOneAndDelete({id});
        if (!deleteProduct) {
          res.status(404).json({error: "Not found!"});
        }
        res.status(200).json({message: "Product deleted."});
      }
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};
