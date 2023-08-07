import mongoose from "mongoose";
import slugify from "slugify";

const pCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

pCategorySchema.pre("save", function (next) {
  this.slug = slugify(this.title, {lower: true});
  next();
});

export const PCategory = mongoose.model("PCategory", pCategorySchema);
