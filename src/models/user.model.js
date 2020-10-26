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
  })
);

export default User;
