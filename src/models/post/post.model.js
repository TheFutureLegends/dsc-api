import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    slug: {
      type: String,
      slug: "title",
      unique: true,
      index: true,
    },
    description: String,
    image: String,
    // image: { data: Buffer, contentType: String }
    visit: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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

// Sets the createdAt parameter equal to the current time
Post.schema.pre("save", (next) => {
  let now = new Date();

  if (!this.createdAt) {
    this.createdAt = now;
  }

  if (!this.updatedAt) {
    this.updatedAt = now;
  }

  next();
});

export default Post;
