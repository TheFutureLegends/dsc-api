import db from "../../models/index.js";
import validationRules from "../../validations/index.js";
import service from "../../services/index.js";
import slugify from "slugify";

const Post = db.post;

const Category = db.category;

const readPost = async (req, res) => {
  try {
    const posts = await Post.find({
      author: {
        _id: req.userId,
      },
    })
      .populate(["author", "category"])
      .exec();

    const result = service.postService.readPost(posts); // Convert to array of object

    return res.status(200).send({ posts: result });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const createPost = async (req, res) => {
  // Validate input
  const { error } = validationRules.postValidation.postSchema.validate(
    req.body
  );

  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findOne({
    slug: req.body.category.toLowerCase(),
  }).exec();

  const postCondition = service.postService.createPost(
    req.body,
    // req.file,
    req.userId,
    category._id
  );

  return res
    .status(postCondition.status)
    .send({ message: postCondition.message });
};

const editPost = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.userId,
    }).exec();

    const postService = service.postService.editPost(post);

    return res
      .status(postService.status)
      .send(postService.data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const body = req.body;

    const post = await Post.findOne({
      _id: req.params.id,
      author: req.userId,
    }).exec();

    if (body.category) {
      const category = await Category.findOne({
        slug: body.category.toLowerCase(),
      }).exec();

      body.category = category._id;
    }

    const postService = service.postService.updatePost(post, body);

    return res
      .status(postService.status)
      .send({ message: postService.message });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.userId,
    }).exec();

    const postService = service.postService.deletePost(post);

    return res
      .status(postService.status)
      .send({ message: postService.message });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const postBackend = {
  readPost,
  createPost,
  editPost,
  updatePost,
  deletePost,
};

export default postBackend;
