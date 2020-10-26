import slugify from "slugify";

import db from "../../models/index.js";
import validationRules from "../../validations/index.js";
import middleware from "../../middleware/index.js";

const Post = db.post;

const User = db.user;

const getAllPosts = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10 } = req.query;

  try {
    // execute query with page and limit values
    const posts = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Post collection
    const count = await Post.countDocuments();

    return res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });

    // return response with posts, total pages, and current page
  } catch (err) {
    console.error("Error: ", err.message);

    return res.status(500).send({ message: err });
  }
};

const getLatestPost = async (req, res) => {
  const query = req.query;

  // Sort by column if provided
  // Default: createdAt column
  // Default: createdAt
  let column = query.sortBy ? query.sortBy : "createdAt";

  // If there is query of limit
  // Get corresponding number of posts
  // Default: null
  let limit = query.limit ? parseInt(query.limit) : null;

  // Determine order of columns when sort if provided - Ascending or Descending
  // Ascending = 0 || Descending = -1
  // Default: Descending
  let order = query.asc ? (query.asc == "true" ? 0 : -1) : 0;

  if (column == "author") {
    column = "author.username";
  } else if (column == "category") {
    column = "category.title";
  }

  Post.find({})
    .sort([[column, order]])
    .limit(limit)
    .exec((err, posts) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      const result = [];

      posts.forEach((value, index) => {
        result.push({
          title: value.title,
          slug: value.slug,
          description: value.description,
          visit: value.visit,
          image: value.image,
          category: {
            title: value.category.title,
            slug: value.category.slug,
          },
          author: {
            username: value.author.username,
            avatar: value.author.avatar,
          },
          createdAt: value.createdAt,
          updatedAt: value.updatedAt,
        });
      });

      return res.status(200).send({
        posts: result,
      });
    });
};

const getSinglePost = async (req, res) => {
  const post = await Post.find({
    slug: req.params.slug,
  });

  return res.status(200).send(post);
};

// Below is only authorized for author role

const displayOwnPosts = async (req, res) => {
  const posts = await Post.find({
    author: req.userId,
  });

  return res.status(200).send(posts);
};

const showPost = async (req, res) => {
  await Post.find({
    slug: req.params.slug,
    author: {
      _id: req.userId,
    },
  }).exec((err, post) => {
    if (err) {
      return res.status(500).send({ message: "Cannot find post" });
    }

    return res.status(200).send(post);
  });
};

const createPost = (req, res) => {
  // Validate input
  const { error } = validationRules.postValidation.postSchema.validate(
    req.body
  );

  if (error) return res.status(400).send(error.details[0].message);

  // Add to model
  const post = new Post({
    title: req.body.title,
    slug: slugify(req.body.title.toLowerCase()),
    description: req.body.description,
  });

  User.findById(req.userId).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: "Invalid user" });
    }

    post.author = {
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
    };

    post.save((err, post) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
    });

    return res.status(200).send({ message: "Post Created Successfully" });
  });
};

const updatePost = async (req, res) => {
  // Validate input
  const { error } = validationRules.postValidation.postSchema.validate(
    req.body
  );

  if (error) return res.status(400).send({ message: error.details[0].message });

  // Find post that has same id and same author
  // Update it with input
  await Post.findOneAndUpdate(
    {
      _id: req.params.id,
      author: {
        _id: req.userId,
      },
    },
    {
      title: req.body.title,
      slug: slugify(req.body.title.toLowerCase()),
      description: req.body.description,
    },
    {
      new: true,
    }
  );

  return res.status(200).send({ message: "Post Updated Successfully" });
};

const deletePost = async (req, res) => {
  await Post.findOneAndDelete({
    _id: req.params.id,
    author: {
      _id: req.userId,
    },
  });
  return res.status(200).send({ message: "Post Deleted Successfully" });
};

export {
  getAllPosts,
  getLatestPost,
  getSinglePost,
  displayOwnPosts,
  showPost,
  createPost,
  updatePost,
  deletePost,
};
