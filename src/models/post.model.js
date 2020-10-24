import mongoose from "mongoose";
import moment from "moment-timezone";

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    slug: {
      type: String,
      index: true,
    },
    description: String,
    imageURL: String,
    // img: { data: Buffer, contentType: String }
    category: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      title: String,
      slug: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

export default Post;
