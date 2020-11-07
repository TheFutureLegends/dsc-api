import faker from "faker";
import slugify from "slugify";
import db from "../models/index.js";
import moment from "moment-timezone";

const University = db.university;

const User = db.user;

const Course = db.course;

const Forum_Question = db.question;

const course_array = db.COURSES;

const questionSeeder = () => {
  Forum_Question.estimatedDocumentCount((err, count) => {
    if (!err) {
      let title = faker.lorem.sentence();

      const question = new Forum_Question({
        title: title,
        slug: slugify(title.toLowerCase().replace(/\.+$/, " ")),
        content: faker.lorem.paragraphs(10),
        status: false,
        createdAt: moment.tz(process.env.TIMEZONE).format(),
        updatedAt: moment.tz(process.env.TIMEZONE).format(),
      });

      User.estimatedDocumentCount((err, userCount) => {
        if (!err) {
          var random = Math.floor(Math.random() * userCount);
          User.findOne()
            .skip(random)
            .exec((err, user) => {
              question.author = user._id;

              Course.findOne({
                code: "COSC2634",
              }).exec((err, course) => {
                question.university = course.university;

                question.course = course._id;

                question.save((err) => {
                  if (err) {
                    console.log("error: ", err);
                  }

                  console.log(
                    `Question with title: ${question.title} is added to collections`
                  );
                });
              });
            });
        }
      });
    }

    if (err) {
      console.log("ERROR: ", err);
      process.exit();
    }
  });
};

export default questionSeeder;
