import mongoose from "mongoose";

const Forum_Question = mongoose.model(
  "Forum Question",
  new mongoose.Schema({
    title: String,
    slug: String,
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    member: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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

export default Forum_Question;
