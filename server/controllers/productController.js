import slugify from "slugify";
import { Product } from "../models/productModel.js";
import { PCategory } from "../models/pCategoryModel.js";

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.find({id});

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({error: "Not found!"});
    }
  } catch (err) {
    res.json({error: err.message});
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.find({ slug });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({error: "Not found!"});
    }
  } catch (err) { 
    res.status(400).json({error: err.message});
  }
}

export const getListByCategory = async (req, res) => {
  try {
    const categorySlug = req.params.category;

    const category = await Product.findOne({slug: categorySlug});
    if (!category) {
      res.status(404).json({error: "Not found!"});
    } 

    const products = await Product.find({category: category}).sort({ createdAt : -1}).exec();
    if (products.length === 0) {
      res.status(404).json({error: "No products found for the specified category."});
    } else {
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}

export const createProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);

      const newProduct = new Product.create(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(202).json(products);
//   } catch (err) {
//     res.status(400).json({error: err.message});
//   }
// }


