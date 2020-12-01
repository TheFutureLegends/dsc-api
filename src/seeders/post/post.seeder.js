import faker from "faker";
import slugify from "slugify";
import db from "../../models/index.js";

const Post = db.post;

const postSeeder = () => {
  const max = 20;
  Post.estimatedDocumentCount((err, count) => {
    if (!err && count < max) {
      const sentence = faker.lorem.sentence();

      const post = new Post({
        title: sentence,
        slug: slugify(sentence),
        description: faker.lorem.paragraphs(),
        image: faker.image.avatar(),
      });
    }
  });
};
