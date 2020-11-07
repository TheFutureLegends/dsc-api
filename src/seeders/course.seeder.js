import faker from "faker";
import slugify from "slugify";
import db from "../models/index.js";
import moment from "moment-timezone";

const University = db.university;

const Course = db.course;

const course_array = db.COURSES;

const courseSeeder = () => {
  Course.estimatedDocumentCount((err, count) => {
    if (!err && count < course_array[0].courses.length) {
      course_array.forEach((value, index) => {
        University.findOne({
          name: value.university,
        }).exec((error, university) => {
          value.courses.forEach((result, index) => {
            const course = new Course({
              university: university._id,
              code: result.code,
              name: result.name,
              description: result.description,
              createdAt: moment.tz(process.env.TIMEZONE).format(),
              updatedAt: moment.tz(process.env.TIMEZONE).format(),
            });

            course.save((err) => {
              if (err) {
                console.log("error: ", err);
              }

              console.log(
                `Course with name: ${result.name} is added to collections`
              );
            });
          });
        });
      });
    }

    if (err) {
      console.log("ERROR: ", err);
      process.exit();
    }

    // if (count < db.UNIVERSITIES.length) {
    //   db.UNIVERSITIES.forEach((value, index) => {
    //     const university = new University({
    //       name: value[0],
    //       slug: slugify(value[0].toLowerCase()),
    //       description: faker.lorem.paragraphs(),
    //       address: faker.address.streetAddress(),
    //       campus: faker.lorem.word(),
    //       mailDomain: value[1],
    //       createdAt: moment.tz(process.env.TIMEZONE).format(),
    //       updatedAt: moment.tz(process.env.TIMEZONE).format(),
    //     });

    //     university.save((err) => {
    //       if (err) {
    //         console.log("error: ", err);
    //       }

    //       console.log(`University with name: ${value} is added to collections`);
    //     });
    //   });
    // }
  });
};

export default courseSeeder;
