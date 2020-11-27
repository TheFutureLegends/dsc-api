import faker from "faker";
import slugify from "slugify";
import db from "../../models/index.js";
import moment from "moment-timezone";

const Category = db.category;

const categorySeeder = () => {
  Category.estimatedDocumentCount((err, count) => {
    if (err) {
      console.log("ERROR: ", err);
      process.exit();
    }

    if (count < db.CATEGORIES.length) {
      db.CATEGORIES.forEach((value, index) => {
        const category = new Category({
          title: value.title,
          slug: slugify(value.title.toLowerCase()),
          description: value.description,
          createdAt: moment.tz(process.env.TIMEZONE).format(),
          updatedAt: moment.tz(process.env.TIMEZONE).format(),
        });

        category.save((err) => {
          if (err) {
            console.log("error: ", err);
          }

          console.log(
            `Category with name: ${value.title} is added to collections`
          );
        });
      });
    }
  });
};

export default categorySeeder;
