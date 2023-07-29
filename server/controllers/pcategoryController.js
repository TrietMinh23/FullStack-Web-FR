import {PCategory} from "../models/pCategoryModel.js";
import slugify from "slugify";

export const getPCategories = async (req, res) => {
  try {
    const pCategory = await PCategory.find();
    res.status(200).json(pCategory);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const createPCategory = async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(400).json({error: "Title is required."});
      return;
    }

    req.body.slug = slugify(req.body.title, {lower: true});

    const newPcategory = await new PCategory(req.body);
    await newPcategory.save();
    res.status(202).json(newPcategory);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const getPCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const pCategory = await PCategory.find({id});

    if (pCategory) {
      res.status(200).json(pCategory);
    } else {
      res.status(404).json({error: "Not found!"});
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const updatePCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const pCategory = await PCategory.findOneAndUpdate({id});

    if (!pCategory) {
      res.status(404).json({error: "Not found!"});
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title, {});
    }

    const pCategoryUpdated = await PCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(pCategoryUpdated);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const deletePCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deletePCategory = await PCategory.findByIdAndDelete(id);
    if (!deletePCategory) {
      res.status(404).json({error: "Not found!"});
    }
    res.status(200).json({message: "Category deleted"});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};
