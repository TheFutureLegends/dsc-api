import mongoose from "mongoose";
import University from "./university.model.js";
import User from "./user.model.js";
import Role from "./role.model.js";
import Category from "./category.model.js";
import Post from "./post.model.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// db.university = University;

db.user = User;

db.category = Category;

db.post = Post;

db.role = Role;

db.ROLES = ["admin", "moderator", "author", "member", "user"];

export default db;
