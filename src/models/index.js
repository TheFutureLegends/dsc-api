import mongoose from "mongoose";

import University from "./university.model.js";
import Club from "./club.model.js";
import User from "./user.model.js";
import Role from "./role.model.js";
import Category from "./category.model.js";
import Post from "./post.model.js";
import Event from "./event.model.js";
import Course from "./course.model.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.university = University;

db.club = Club;

db.user = User;

db.category = Category;

db.post = Post;

db.event = Event;

db.course = Course;

db.role = Role;

db.ROLES = ["super-admin", "admin", "moderator", "author", "member", "user"];

// db.UNIVERSITIES = ["RMIT University"];

db.UNIVERSITIES = [["RMIT University", "rmit.edu.vn"]];

db.CLUBS = ["RMIT Developer Student Club", "RMIT Finance and Technology"];

var courses = [
  {
    university: "RMIT University",
    courses: [
      ["COSC2634", "Building IT System"],
      ["COSC2081", "Programming 1"],
    ],
  },
  {
    university: "Oxford University",
    courses: [
      ["COSC2101", "Software Engineering: Process and Tools"],
    ],
  },
];

db.COURSES = courses;

export default db;
