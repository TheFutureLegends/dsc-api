import faker from "faker";
import slugify from "slugify";
import db from "../../models/index.js";
import moment from "moment-timezone";

const University = db.university;

const Club = db.club;

const clubSeeder = () => {
  console.log("Calling club seeder!");
  Club.estimatedDocumentCount((err, count) => {
    if (err) {
      console.log("ERROR: ", err);
      process.exit();
    }

    if (count < db.CLUBS.length) {
      db.CLUBS.forEach((value, index) => {
        const club = new Club({
          name: value,
          slug: slugify(value.toLowerCase()),
          description: faker.lorem.paragraphs(),
          createdAt: moment.tz(process.env.TIMEZONE).format(),
          updatedAt: moment.tz(process.env.TIMEZONE).format(),
        });

        University.findOne({
          name: db.UNIVERSITIES[0],
        }).exec((err, university) => {
          club.university = university._id;

          club.save((err) => {
            if (err) {
              console.log("error: ", err);
            }

            console.log(`\nClub with name: ${value} is added to collections`);
          });
        });
      });
    }
  });
};

export default clubSeeder;
