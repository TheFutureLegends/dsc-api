import faker from "faker";
import slugify from "slugify";
import db from "../../models/index.js";

const User = db.user;

const Post = db.post;

const Category = db.category;

const postSeeder = () => {
  const max = 20;
  Post.estimatedDocumentCount((err, postCount) => {
    if (!err && postCount < max) {
      const sentence = faker.lorem.sentence();

      const post = new Post({
        title: sentence,
        slug: slugify(sentence),
        description: faker.lorem.paragraphs(),
        image: faker.image.avatar(),
        visit: 0,
      });

      Category.estimatedDocumentCount((err, categoryCount) => {
        var random = Math.floor(Math.random() * categoryCount);

        // Again query all users but only fetch one offset by our random #
        Category.findOne()
          .skip(random)
          .exec(function (err, category) {
            post.category = category._id;

            User.estimatedDocumentCount((err, userCount) => {});
          });
      });
    }
  });
};

export default postSeeder;
