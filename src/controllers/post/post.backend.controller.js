import db from "../../models/index.js";
import postCrud from "../../actions/postCrud.action.js";
import validationRules from "../../validations/index.js";

const Post = db.post;

const Category = db.category;

const readPost = async (req, res) => {
  // const { limit = 10, page = 1 } = req.query;

  try {
    const posts = await Post.find({
      author: {
        _id: req.userId,
      },
    })
      .populate(["author", "category"])
      .exec();

    const result = postCrud.readPost(posts); // Convert to array of object

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

  const postCondition = postCrud.createPost(
    req.body,
    req.file,
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

    return res.status(200).send(postCrud.editPost(post));
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

    const category = await Category.findOne({
      slug: req.body.category.toLowerCase(),
    }).exec();

    body.category = category._id;

    const postCondition = postCrud.updatePost(post, body);

    return res
      .status(postCondition.status)
      .send({ message: postCondition.message });
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

    const postCondition = postCrud.deletePost(post);

    return res
      .status(postCondition.status)
      .send({ message: postCondition.message });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const postBackend = { readPost, createPost, editPost, updatePost, deletePost };

export default postBackend;
