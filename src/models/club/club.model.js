import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const Club = mongoose.model(
  "Club",
  new mongoose.Schema({
    name: String,
    slug: {
      type: String,
      slug: "title",
      unique: true,
      index: true,
    },
    description: String,
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
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
