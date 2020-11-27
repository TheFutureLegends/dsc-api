import mongoose from "mongoose";

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

export default Category;
