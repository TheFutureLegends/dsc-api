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

const userBoard = (req, res) => {
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

const updatePost = (req, res) => {
  return res.status(200).send("Post Updated Successfully");
};

const deletePost = (req, res) => {
  return res.status(200).send("Post Deleted Successfully");
};

export { createPost, updatePost, deletePost };
