import faker from "faker";
import slugify from "slugify";
import db from "../models/index.js";
import moment from "moment-timezone";

const University = db.university;

const universitySeeder = () => {
  University.estimatedDocumentCount((err, count) => {
    if (err) {
      console.log("ERROR: ", err);
      process.exit();
    }

    if (count < db.UNIVERSITIES.length) {
      db.UNIVERSITIES.forEach((value, index) => {
        const university = new University({
          name: value,
          slug: slugify(value.toLowerCase()),
          description: faker.lorem.paragraphs(),
          address: faker.address.streetAddress(),
          campus: faker.lorem.word(),
          createdAt: moment.tz(process.env.TIMEZONE).format(),
          updatedAt: moment.tz(process.env.TIMEZONE).format(),
        });

        university.save((err) => {
          if (err) {
            console.log("error: ", err);
          }

          console.log(
            `University with name: ${value} is added to collections`
          );
        });
      });
    }
  });
};

export default universitySeeder;
