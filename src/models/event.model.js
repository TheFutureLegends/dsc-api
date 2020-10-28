import mongoose from "mongoose";

const Event = mongoose.model(
  "Event",
  new mongoose.Schema({
    title: String,
    slug: {
      type: String,
      index: true,
    },
    description: String,
    image: String,
    // image: { data: Buffer, contentType: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    visit: Number,
    startAt: {
      type: mongoose.Schema.Types.Date,
      default: Date.now(),
    },
    endAt: {
      type: mongoose.Schema.Types.Date,
      default: Date.now(),
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // avatar: { data: Buffer, contentType: String }
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

export default Event;
