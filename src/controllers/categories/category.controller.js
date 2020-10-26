import Joi from "joi";
import slugify from "slugify";
import moment from "moment-timezone";

import db from "../../models/index.js";
import middleware from "../../middleware/index.js";

const Category = db.category;

const Post = db.post;

// Define backend validation
const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const getAllCategories = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10 } = req.query;

  try {
    // execute query with page and limit values
    const categories = await Category.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Post collection
    const count = await Category.countDocuments();

    return res.json({
      categories,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });

    // return response with posts, total pages, and current page
  } catch (err) {
    console.error("Error: ", err.message);
    return res.status(500).send({ message: err.message });
  }
};

// const getLatestPost = async (req, res) => {
//   const query = req.query;

//   // Sort by column if provided
//   // Default: createdAt column
//   // Default: createdAt
//   let column = query.sortBy ? query.sortBy : "createdAt";

//   // If there is query of limit
//   // Get corresponding number of posts
//   // Default: null
//   let limit = query.limit ? parseInt(query.limit) : null;

//   // Determine order of columns when sort if provided - Ascending or Descending
//   // Ascending = 0 || Descending = -1
//   // Default: Descending
//   let order = query.asc ? (query.asc == "true" ? -1 : 0) : -1;

//   const post = await Post.find({})
//     .sort([[column, order]])
//     .limit(limit);

//   return res.status(200).send(post);
// };

const getSingleCategory = async (req, res) => {
  Category.findOne({
    slug: req.params.slug,
  }).exec((err, category) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    // Define category array
    const c_array = [
      {
        title: category.title,
        slug: category.slug,
        description: category.description,
      },
    ];

    // Define post array
    const p_array = [];

    Post.find({
      "category._id": category._id,
    }).exec((err, posts) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      posts.forEach((value, index) => {
        p_array.push({
          title: value.title,
          slug: value.slug,
          description: value.description,
          image: value.image,
          visit: value.visit,
          author: {
            username: value.author.username,
            avatar: value.author.avatar,
          },
          createdAt: value.createdAt,
          updatedAt: value.updatedAt,
        });
      });

      return res.status(200).send({ category: c_array, posts: p_array });
    });
  });
};

// Below is only authorized for moderator role

const createCategory = async (req, res) => {
  // Validate input
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    title: req.body.title,
    slug: slugify(req.body.title.toLowerCase()),
    description: req.body.description,
    createdAt: moment().tz("Asia/Ho_Chi_Minh").format("MM-DD-YYYY HH:mm:ss"),
    updatedAt: moment().tz("Asia/Ho_Chi_Minh").format("MM-DD-YYYY HH:mm:ss"),
  });

  await category.save((err, result) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
  });

  return res.status(201).send("New category has been created!");
};

const updateCategory = async (req, res) => {
  // Validate input
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // Find category that has same id
  // Update it with input
  await Category.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      slug: slugify(req.body.title.toLowerCase()),
      description: req.body.description,
      updatedAt: moment().tz("Asia/Ho_Chi_Minh").format("MM-DD-YYYY HH-mm-ss"),
    },
    {
      new: true,
    }
  );

  return res.status(200).send("Post Updated Successfully");
};

const deleteCategory = async (req, res) => {
  await Category.findOneAndDelete({
    _id: req.params.id,
  });
  return res.status(200).send("Post Deleted Successfully");
};

export {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
