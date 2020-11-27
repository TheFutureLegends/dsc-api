import mongoose from "mongoose";

import User from "./user/user.model.js";
import Role from "./role/role.model.js";

import University from "./university/university.model.js";
import Club from "./club/club.model.js";

import Post from "./post/post.model.js";
import Comment from "./comment/comment.model.js";

import Category from "./category/category.model.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;

db.role = Role;

db.university = University;

db.club = Club;

db.post = Post;

db.comment = Comment;

db.category = Category;

// Initialize Default Value
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

db.CATEGORIES = [
  {
    title: "Web Development",
    description:
      "Web development refers to building, creating, and an maintaining websites. It includes aspects such as web design, web publishing, web programming, and database management. While the terms 'web developer' and 'web designer' are often used synonymously, they do not mean the same thing. Technically, a web designer only designs website interfaces using HTML and CSS. A web developer may be involved in designing a website, but may also write web scripts in languages such as PHP and ASP. Additionally, a web developer may help maintain and update a database used by a dynamic website.",
  },
  {
    title: "Mobile Development",
    description:
      "Mobile developers are a type of software developer. They specialise in mobile technology such as building apps for Google’s Android, Apple’s iOS and Microsoft’s Windows Phone platforms. For this reason job titles for this type of role also include Android developer and iOS developer. Mobile developers learn the programming languages and software development environment for their chosen platform. Currently, there are a handful of major mobile platforms, each with its own core language(s) and development environment (eg Java for Android, Objective-C for iOS and C# for Windows Phone), but this is in a state of constant change to keep up with the pace of new technology.",
  },
  {
    title: "Artificial Intelligence",
    description:
      "Artificial intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving. The ideal characteristic of artificial intelligence is its ability to rationalize and take actions that have the best chance of achieving a specific goal.",
  },
  {
    title: "Machine Learning",
    description:
      "Machine learning is an application of artificial intelligence (AI) that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. Machine learning focuses on the development of computer programs that can access data and use it learn for themselves. The process of learning begins with observations or data, such as examples, direct experience, or instruction, in order to look for patterns in data and make better decisions in the future based on the examples that we provide. The primary aim is to allow the computers learn automatically without human intervention or assistance and adjust actions accordingly. But, using the classic algorithms of machine learning, text is considered as a sequence of keywords; instead, an approach based on semantic analysis mimics the human ability to understand the meaning of a text.",
  },
];

export default db;
