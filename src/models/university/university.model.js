import mongoose from "mongoose";

const University = mongoose.model(
  "University",
  new mongoose.Schema({
    name: String,
    slug: {
      type: String,
      index: true,
    },
    description: String,
    address: String,
    campus: String,
    mailDomain: String,
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
