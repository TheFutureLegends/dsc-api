import mongoose from "mongoose";

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    content: String,
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
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

export default Comment;
