import Joi from "joi";
import slugify from "slugify";

import db from "../../models/index.js";

const Post = db.post;

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const allAccess = (req, res) => {
  return res.status(200).send("Public Content.");
};

const getAllPosts = (req, res) => {
  return res.status(200).send("User Content.");
};

const createPost = (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const post = new Post({
    title: req.body.title,
    slug: slugify(req.body.title.toLowerCase()),
    description: req.body.description,
    author: req.userId,
  });

  post.save((err, post) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
  });

  return res.status(200).send("Post Created Successfully");
};

const updatePost = async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let doc = await Post.findOneAndUpdate({ _id: req.params.id }, {
    title: req.body.title,
    slug: slugify(req.body.title.toLowerCase()),
    description: req.body.description,
  }, {
    new: true
  });

  console.log(doc.title);

  // Post.findById(req.params.id).exec((err, post) => {
  //   if (err) {
  //     res.status(500).send({ message: err });
  //     return;
  //   }

  //   if (!post) {
  //     res.status(404).send({ message: "Post Not found." });
  //     return;
  //   }

  //   console.log(post);
  // });

  return res.status(200).send("Post Updated Successfully");
};

const deletePost = (req, res) => {
  return res.status(200).send("Post Deleted Successfully");
};

export { getAllPosts, createPost, updatePost, deletePost };
