import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    // Current version
    avatar: {
      type: String,
      default: null,
    },
    // Mobile version later
    // avatar: { data: Buffer, contentType: String }
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },
    club: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
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

export default User;
