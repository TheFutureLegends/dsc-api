import mongoose from "mongoose";

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },
    code: String,
    name: String,
    courses: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        code: String,
        name: String,
      },
    ],
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
