import mongoose from "mongoose";

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    content: String,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
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

export default Comment;
