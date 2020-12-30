import db from "../../models/index.js";
import postContainer from "../../containers/post/postContainer.js";
import validationRules from "../../validations/index.js";
import service from "../../services/index.js";
import utilities from "../../utilities/index.js";

const Post = db.post;

const Category = db.category;

const postContainers = new postContainer();

const getAllPosts = async (req, res) => {
  /**
   * Get query from URL
   *
   * See default in postRoutes.js
   */
  const query = req.query;

  /**
   * Declare empty variables that can change
   */
  let posts;

  /**
   * Get query of latest
   *
   * Default: false
   */
  // let latest = query.latest ? (query.latest == "true" ? true : false) : false;

  /**
   * Sort by column if provided
   *
   * Default: createdAt column
   */
  let column = query.sortBy ? query.sortBy : "createdAt";

  /**
   * If there is query of limit
   *
   * Get corresponding number of posts
   *
   * Default: 10
   */
  let limit = query.limit
    ? utilities.converter.convertStringToNumber(query.limit)
    : 10;

  /**
   * Determine order of columns when sort if provided - Ascending or Descending
   *
   * Ascending = 0 || Descending = -1
   *
   * Default: Descending
   */
  let order = query.asc ? (query.asc == "true" ? 1 : -1) : 1;

  /**
   * Get query of page
   *
   * Default 1
   */
  let page = query.page ? query.page : 1;

  if (column == "author") {
    column = "author.username";
  } else if (column == "category") {
    column = "category.title";
  }

  try {
    posts = await Post.find({})
        .sort([[column, order]])
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate(["category", "author"])
        .exec();

    /**
     * Set posts get from query
     *
     * Convert to array of object with selected field
     */
    postContainers.setPostArray = posts;

    /**
     * Get total documents in the Post collection
     */
    const count = await Post.countDocuments();

    /**
     * return response with posts, total pages, and current page
     */
    return res.json({
      posts: postContainers.getPostArray(),
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getTopAuthors = async (req, res) => {
  /**
   * Get query from URL
   *
   * See default in postRoutes.js
   */
  const query = req.query;

  /**
   * If there is query of limit
   *
   * Get corresponding number of posts
   *
   * Default: 10
   */
  let limit = query.limit
    ? utilities.converter.convertStringToNumber(query.limit)
    : 10;

  /**
   * Determine order of columns when sort if provided - Ascending or Descending
   *
   * Ascending = 1 || Descending = -1
   *
   * Default: Descending
   */
  let order = query.asc ? (query.asc == "true" ? 1 : -1) : 1;

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
          /**
           * Descending visit if not provided asc
           */
          total_visit: order,
        },
      },
      {
        $limit: limit,
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
    return res.status(500).send({ message: error.message });
  }
};

const getPostDetail = async (req, res) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
    })
      .populate(["author", "category"])
      .exec();

    postContainers.setPost = post;

    return res.status(200).send({ post: postContainers.getPost() });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

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
    })
      .populate("category")
      .exec();

    const postService = service.postService.editPost(post);

    return res.status(postService.status).send(postService.data);
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
    return res.status(error.status).send({ message: error.message });
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

const postController = {
  getAllPosts,
  getTopAuthors,
  getPostDetail,
  readPost,
  createPost,
  editPost,
  updatePost,
  deletePost,
};

export default postController;
