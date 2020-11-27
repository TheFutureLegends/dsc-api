import faker from "faker";
import slugify from "slugify";
import db from "../../models/index.js";
import moment from "moment-timezone";

const University = db.university;

const universitySeeder = () => {
  console.log("Calling univeristy seeder!");
  University.estimatedDocumentCount((err, count) => {
    if (err) {
      console.log("ERROR: ", err);
      process.exit();
    }

    if (count < db.UNIVERSITIES.length) {
      db.UNIVERSITIES.forEach((value, index) => {
        const university = new University({
          name: value[0],
          slug: slugify(value[0].toLowerCase()),
          description: faker.lorem.paragraphs(),
          address: faker.address.streetAddress(),
          campus: faker.lorem.word(),
          mailDomain: value[1],
          createdAt: moment.tz(process.env.TIMEZONE).format(),
          updatedAt: moment.tz(process.env.TIMEZONE).format(),
        });

        university.save((err) => {
          if (err) {
            console.log("error: ", err);
          }

          console.log(`University with name: ${value} is added to collections`);
        });
      });
    }
  });
};

export default universitySeeder;
