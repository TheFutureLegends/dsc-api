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
      slug: String,
      title: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
      default: moment().tz("Asia/Ho_Chi_Minh").format("MM-DD-YYYY HH-mm-ss"),
    },
    updatedAt: {
      type: mongoose.Schema.Types.Date,
      default: moment().tz("Asia/Ho_Chi_Minh").format("MM-DD-YYYY HH-mm-ss"),
    },
  })
);

export default Post;
