import faker from "faker";
import slugify from "slugify";
import db from "../models/index.js";

const User = db.user;

const Category = db.category;

const Post = db.post;

const postSeeder = () => {
  console.log(`\nBegin seeding post to collection\n`);

  Post.estimatedDocumentCount((err, count) => {
    if (!err && count < 5000) {
      for (let index = 0; index < 1000; index++) {
        let title = faker.lorem.sentence();

        const post = new Post({
          title: title,
          slug: slugify(title.toLowerCase().replace(/\.+$/, " ")),
          description: faker.lorem.paragraphs(10),
          visit: faker.random.number(),
          image: faker.image.imageUrl(),
        });

        Category.estimatedDocumentCount((err, count) => {
          if (!err) {
            // Get a random entry
            var random = Math.floor(Math.random() * count);

            Category.findOne()
              .skip(random)
              .exec((err, result) => {
                post.category = result._id;

                User.estimatedDocumentCount((err, count) => {
                  if (!err) {
                    // Get a random entry
                    var random = Math.floor(Math.random() * count);

                    User.findOne()
                      .skip(random)
                      .exec((err, user) => {
                        post.author = user._id;

                        post.save((err) => {
                          if (err) {
                            console.error("error: ", err);
                          }

                          console.log(
                            `Finish seeding post with title ${post.title} to collection`
                          );
                        });
                      });
                  }
                });
              });
          }
        });
      }
    }

    console.log(`\nEnd post seeding`);
  });
};

export default postSeeder;
