import faker from "faker";
import slugify from "slugify";
import db from "../models/index.js";

const User = db.user;

const Event = db.event;

const Category = db.category;

const eventSeeder = () => {
  Event.estimatedDocumentCount((err, count) => {
    if (!err && count < 2000) {
      for (let index = 0; index < 500; index++) {
        // Initialize title of event
        const title = faker.lorem.sentence();

        // Initialize sample data of event
        const event = new Event({
          title: title,
          slug: slugify(title.toLowerCase().replace(/\.+$/, " ")),
          description: faker.lorem.paragraphs(),
          visit: faker.random.number(),
          image: faker.image.imageUrl(),
        });

        Category.estimatedDocumentCount((catErr, categoriesCount) => {
          if (catErr) {
            console.error("ERROR:", catErr);
            process.exit();
          }

          var random = Math.floor(Math.random() * categoriesCount);

          Category.findOne()
            .skip(random)
            .exec((error, categories) => {
              if (error) {
                console.error("ERROR:", error);
                process.exit();
              }

              event.category = {
                _id: categories._id,
                title: categories.title,
                slug: categories.slug,
              };

              User.estimatedDocumentCount((userErr, usersCount) => {
                if (!userErr) {
                  // Get a random entry
                  var random = Math.floor(Math.random() * usersCount);

                  User.findOne()
                    .skip(random)
                    .exec((err, result) => {
                      // Assign random user to author
                      event.author = {
                        _id: result._id,
                        username: result.username,
                        avatar: result.avatar,
                      };

                      event.save((err) => {
                        if (err) {
                          console.error("error: ", err);
                        }

                        console.log(
                          `Finish seeding event with title ${event.title} to collection`
                        );
                      });
                    });
                }
              });
            });
        });
      }
    }
  });
};

export default eventSeeder;