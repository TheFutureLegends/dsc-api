import mongoose from "mongoose";

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    title: String,
    slug: String,
    type: {
      type: String,
      enum: ["LFG", "QUESTION"],
      default: "QUESTION",
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
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

export default Course;
