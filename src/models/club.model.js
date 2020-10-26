import mongoose from "mongoose";

const Club = mongoose.model(
  "Club",
  new mongoose.Schema({
    name: String,
    slug: {
      type: String,
      index: true,
    },
    description: String,
    university: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
      },
      name: String,
      slug: String,
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

export default Club;
