import mongoose from "mongoose";

import University from "./university.model.js";
import Club from "./club.model.js";
import User from "./user.model.js";
import Role from "./role.model.js";
import Category from "./category.model.js";
import Post from "./post.model.js";
import Event from "./event.model.js";

// Initialize Forum Model
import Forum_Question from "./forum/question.forum.model.js";
import Forum_Answer from "./forum/answer.forum.model.js";
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

db.role = Role;

// Initialize Forum Model

db.course = Course;

db.question = Forum_Question;

db.answer = Forum_Answer;

db.ROLES = ["super-admin", "admin", "moderator", "author", "member", "user"];

db.UNIVERSITIES = [
  ["RMIT University", "rmit.edu.vn"],
  ["Ton Duc Thang University", "tdt.edu.vn"],
  ["Bach Khoa University", "bk.edu.vn"],
];

db.CLUBS = [
  "Developer Student",
  "Finance and Technology",
  "Mass Multimedia",
  "Kendo",
  "Taekwondo",
  "Karatedo",
  "Dance",
  "Basketball",
];

db.COURSES = [
  {
    university: "RMIT University",
    courses: [
      {
        code: "COSC2634",
        name: "Building IT System",
        description:
          "IT today is everywhere and is involved in many aspects of life, include mobile devices, electronic voting and robotic fish.",
      },
      {
        code: "COSC2081",
        name: "Programming 1",
        description:
          "This course introduce object-oriented programming using the Java programming language.",
      },
    ],
  },
];

export default db;
