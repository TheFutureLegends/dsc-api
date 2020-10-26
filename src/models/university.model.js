import mongoose from "mongoose";
import moment from "moment-timezone";

const University = mongoose.model(
  "University",
  new mongoose.Schema({
    title: String,
    slug: {
      type: String,
      index: true,
    },
    description: String,
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

export default University;
