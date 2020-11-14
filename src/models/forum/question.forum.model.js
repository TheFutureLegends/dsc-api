import mongoose from "mongoose";

const Forum_Question = mongoose.model(
  "Forum Question",
  new mongoose.Schema({
    title: String,
    slug: String,
    content: String,
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Forum Answer",
      },
    ],
    status: {
      type: Boolean,
      enum: [true, false],
      default: false,
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
