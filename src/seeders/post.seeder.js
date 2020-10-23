import faker from "faker";
import slugify from "slugify";
import db from "../models/index.js";

const User = db.user;

const Post = db.post;

const postSeeder = () => {
  console.log(`\nBegin seeding post to collection\n`);

  Post.estimatedDocumentCount((err, count) => {
    if (!err && count < 5000) {
      for (let index = 0; index < 1000; index++) {
        let title = faker.lorem.sentence();

        const post = new Post({
          title: title,
          slug: slugify(title.replace(/\.+$/, " ")),
          description: faker.lorem.paragraphs(),
        });

        User.estimatedDocumentCount((err, count) => {
          if (!err) {
            // Get a random entry
            var random = Math.floor(Math.random() * count);

            User.findOne()
              .skip(random)
              .exec((err, result) => {
                // Assign random user to author
                post.author = result._id;

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
      }
    }

    console.log(`\nEnd post seeding`);
  });
};

export default postSeeder;