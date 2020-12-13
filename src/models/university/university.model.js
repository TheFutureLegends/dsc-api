import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const University = mongoose.model(
  "University",
  new mongoose.Schema({
    name: String,
    slug: {
      type: String,
      slug: "name",
      unique: true,
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
