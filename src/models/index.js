import mongoose from "mongoose";
import User from "./user.model.js";
import Role from "./role.model.js";
import Post from "./post.model.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;

db.post = Post;

db.role = Role;

db.ROLES = ["user", "admin", "moderator", "author"];

export default db;
