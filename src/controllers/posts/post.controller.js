import slugify from "slugify";

import db from "../../models/index.js";
import validationRules from "../../validations/index.js";
import middleware from "../../middleware/index.js";
import util from "../../utils/functions.util.js";

const Post = db.post;

const Category = db.category;

const User = db.user;

const getTopAuthors = async (req, res) => {
  // return res.send({ result: parseInt(req.query.limit) });

  const { limit = 5 } = req.query;

  try {
    const topAuthors = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $group: {
          _id: "$author",
          total_post: { $sum: 1 },
          total_visit: { $sum: "$visit" },
        },
      },
      {
        $sort: {
          // Descending visit
          total_visit: -1,
        },
      },
      {
        $limit: parseInt(limit),
      },
    ]);

    const result = [];

    topAuthors.forEach((value, index) => {
      value._id.forEach((author, key) => {
        result.push({
          author: {
            username: author.username,
            email: author.email,
            avatar: author.avatar,
          },
          total_posts: value.total_post,
          total_visits: value.total_visit,
        });
      });
    });

    return res.status(200).send({ topAuthors: result });
  } catch (error) {
    console.error("Error: ", error.message);

    return res.status(500).send({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10 } = req.query;

  try {
    const posts = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate(["category", "author"])
      .exec();

    const p_array = util.iteratePostAndEventObject(posts);

    // get total documents in the Post collection
    const count = await Post.countDocuments();

    return res.json({
      posts: p_array,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });

    // return response with posts, total pages, and current page
  } catch (err) {
    console.error("Error: ", err.message);

    return res.status(500).send({ message: err.message });
  }
};

const getLatestPost = async (req, res) => {
  const query = req.query;

  // Sort by column if provided
  // Default: createdAt column
  let column = query.sortBy ? query.sortBy : "createdAt";

  // If there is query of limit
  // Get corresponding number of posts
  // Default: null
  let limit = query.limit ? parseInt(query.limit) : 10;

  // Determine order of columns when sort if provided - Ascending or Descending
  // Ascending = 0 || Descending = -1
  // Default: Descending
  let order = query.asc ? (query.asc == "true" ? 1 : -1) : 1;

  if (column == "author") {
    column = "author.username";
  } else if (column == "category") {
    column = "category.title";
  }

  Post.find({})
    .sort([[column, order]])
    .limit(limit)
    .populate(["category", "author"])
    .exec((err, posts) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      const result = util.iteratePostAndEventObject(posts);

      return res.status(200).send({
        posts: result,
      });
    });
};

const getPost = async (req, res) => {
  const post = await Post.findOne({
    slug: req.params.slug,
  })
    .populate(["category", "author"])
    .exec();

  if (post) {
    const result = {
      title: post.title,
      slug: post.slug,
      description: post.description,
      visit: post.visit,
      image: post.image,
      category: {
        title: post.category.title,
        slug: post.category.slug,
      },
      author: {
        username: post.author.username,
        avatar: post.author.avatar,
      },
      createdAt: util.formatDate(post.createdAt),
      updatedAt: util.formatDate(post.updatedAt),
    };

    return res.status(200).send({ post: result });
  }

  return res.status(404).send({ message: "Post is not found!" });
};

// Below is only authorized for author role

const displayOwnPosts = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  const posts = await Post.find({
    author: {
      _id: req.userId,
    },
  })
    .populate(["author", "category"])
    .exec();

  const p_array = util.iteratePostAndEventObject(posts);

  return res.status(200).send({ posts: p_array });
};

const showPost = async (req, res) => {
  const post = await Post.findOne({
    slug: req.params.slug,
    author: {
      _id: req.userId,
    },
  })
    .populate("category")
    .exec();

  if (post) {
    const result = {
      title: post.title,
      slug: post.slug,
      description: post.description,
      visit: post.visit,
      image: post.image,
      category: {
        title: post.category.title,
        slug: post.category.slug,
      },
      createdAt: util.formatDate(post.createdAt),
      updatedAt: util.formatDate(post.updatedAt),
    };

    return res.status(200).send({ post: result });
  }

  return res.status(404).send({ message: "Post is not found!" });
};

const createPost = async (req, res) => {
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

  const user = await User.findById(req.userId).exec();

  post.author = user._id;

  const category = await Category.findOne({
    slug: req.body.category.toLowerCase(),
  }).exec();

  post.category = category._id;

  post.image = process.env.APP_URL + "/static/upload/" + req.file.filename;

  post.save((err, post) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
  });

  return res.status(200).send({ message: "Post Created Successfully" });
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
  getTopAuthors,
  getAllPosts,
  getLatestPost,
  getPost,
  displayOwnPosts,
  showPost,
  createPost,
  updatePost,
  deletePost,
};
