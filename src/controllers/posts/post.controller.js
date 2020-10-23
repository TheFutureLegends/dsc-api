import Joi from "joi";
import slugify from "slugify";

import db from "../../models/index.js";
import middleware from "../../middleware/index.js";

const Post = db.post;

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const allAccess = (req, res) => {
  return res.status(200).send("Public Content.");
};

const getAllPosts = async (req, res) => {
  // Sort Ascending = 0 || Otherwise = -1
  const post = await Post.find({})
    .sort([["createdAt", -1]])
    .limit(null);

  return res.status(200).send(post);
};

const getLatestPost = async (req, res) => {
  const query = req.query;

  // Sort by column if provided
  // Default: createdAt column
  let column = query.sortBy ? query.sortBy : "createdAt";

  // If there is query of limit
  // Get corresponding number of posts
  let limit = query.limit ? parseInt(query.limit) : null;

  // Determine order of columns when sort if provided - Ascending or Descending
  // Ascending = 0 || Descending = -1
  // Default: Descending
  let order = query.asc ? (query.asc == "true" ? -1 : 0) : -1;

  const post = await Post.find({})
    .sort([[column, order]])
    .limit(limit);

  return res.status(200).send(post);
};

// Below is only authorized for author role

const displayOwnPosts = async (req, res) => {
  const posts = await Post.find({
    author: req.userId,
  });

  return res.status(200).send(posts);
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

  await Post.findOneAndUpdate(
    { _id: req.params.id, author: req.userId },
    {
      title: req.body.title,
      slug: slugify(req.body.title.toLowerCase()),
      description: req.body.description,
    },
    {
      new: true,
    }
  );

  return res.status(200).send("Post Updated Successfully");
};

const deletePost = async (req, res) => {
  await Post.findOneAndDelete({
    _id: req.params.id,
    author: req.userId,
  });
  return res.status(200).send("Post Deleted Successfully");
};

export {
  getAllPosts,
  getLatestPost,
  displayOwnPosts,
  createPost,
  updatePost,
  deletePost,
};
