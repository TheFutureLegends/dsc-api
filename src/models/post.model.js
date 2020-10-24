import mongoose from "mongoose";

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    slug: String,
    description: String,
    imageURL: String,
    // img: { data: Buffer, contentType: String }
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
    },
    updatedAt: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
    },
  })
);

export default Post;
