import mongoose from "mongoose";
import slugify from "slugify";

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    title: String,
    slug: {
      type: String,
      index: true,
    },
    description: String,
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Category",
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
      default: Date.now(),
    },
    updatedAt: {
      type: mongoose.Schema.Types.Date,
      default: Date.now(),
    },
  })
);

// Sets the createdAt parameter equal to the current time
Category.schema.pre("save", (next) => {
  now = new Date();

  this.slug = slugify(this.title.toLowerCase());

  if (!this.createdAt) {
    this.createdAt = now;
  }

  if (!this.updatedAt) {
    this.updatedAt = now;
  }

  next();
});

export default Category;
