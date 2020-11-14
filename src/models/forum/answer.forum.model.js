import mongoose from "mongoose";

const Forum_Question = mongoose.model(
  "Forum Answer",
  new mongoose.Schema({
    content: String,
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },
    // course: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Course",
    // },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Forum Question",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
