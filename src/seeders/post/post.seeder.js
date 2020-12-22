import faker from "faker";
import slugify from "slugify";
import db from "../../models/index.js";

const User = db.user;

const Post = db.post;

const Category = db.category;

const postSeeder = () => {
  const max = 20;
  Post.estimatedDocumentCount((err, postCount) => {
    if (!err) {
      for (let index = 0; index < max; index++) {
        const sentence = faker.lorem.sentence();

        const post = new Post({
          title: sentence,
          slug: slugify(sentence.toLowerCase()),
          description: faker.lorem.paragraphs(),
          image:
            "https://images.pexels.com/photos/414102/pexels-photo-414102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          visit: 0,
        });

        Category.estimatedDocumentCount((err, categoryCount) => {
          var randomCategory = Math.floor(Math.random() * categoryCount);

          // Again query all users but only fetch one offset by our random #
          Category.findOne()
            .skip(randomCategory)
            .exec((err, category) => {
              post.category = category._id;

              User.estimatedDocumentCount((err, userCount) => {
                var randomUser = Math.floor(Math.random() * userCount);
                User.findOne()
                  .skip(randomUser)
                  .exec((err, user) => {
                    post.author = user._id;

                    post.save((err) => {
                      if (err) {
                        console.log("Error: ", err);
                        process.exit();
                      }

                      console.log(
                        `\Post with title: ${post.title} is added to collections`
                      );
                    });
                  });
              });
            });
        });
      }
    }
  });
};

export default postSeeder;
