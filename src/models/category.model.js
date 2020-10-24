import mongoose from "mongoose";
import moment from "moment-timezone";

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
    createdAt: Date,
    updatedAt: Date,
  })
);

export default Category;
