import mongoose from "mongoose";

import University from "./university.model.js";
import Club from "./club.model.js";
import User from "./user.model.js";
import Role from "./role.model.js";
import Category from "./category.model.js";
import Post from "./post.model.js";
import Event from "./event.model.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.university = University;

db.club = Club;

db.user = User;

db.category = Category;

db.post = Post;

db.event = Event;

db.role = Role;

db.ROLES = ["admin", "moderator", "author", "member", "user"];

db.UNIVERSITIES = ["RMIT University"];

db.CLUBS = ["RMIT Developer Student Club", "RMIT Finance and Technology"]

export default db;
