import db from "../../models/index.js";
import postClasses from "../../classes/post.class.js";

const Post = db.post;

const postClass = new postClasses();

const getAllPosts = async (req, res) => {
  const query = req.query;

  let posts;

  // Get query of latest
  // Default: false
  let latest = query.latest ? (query.latest == "true" ? true : false) : false;

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

  // Get query of page
  // Default 1
  let page = query.page ? query.page : 1;

  // destructure page and limit and set default values
  //   const { page = 1, limit = 10 } = req.query;

  if (column == "author") {
    column = "author.username";
  } else if (column == "category") {
    column = "category.title";
  }

  try {
    if (latest) {
      posts = await Post.find({})
        .sort([[column, order]])
        .limit(limit)
        .populate(["category", "author"])
        .exec();
    } else {
      posts = await Post.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate(["category", "author"])
        .exec();
    }

    const result = [];

    posts.forEach((value, index) => {
      postClass.setPost = value;

      result.push(postClass.getPost());
    });

    // get total documents in the Post collection
    const count = await Post.countDocuments();

    // return response with posts, total pages, and current page
    return res.json({
      posts: result,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error("Error: ", err.message);

    return res.status(500).send({ message: err.message });
  }
};

const getTopAuthors = async (req, res) => {
  const query = req.query;

  // If there is query of limit
  // Get corresponding number of posts
  // Default: 10
  let limit = query.limit ? parseInt(query.limit) : 10;

  // Determine order of columns when sort if provided - Ascending or Descending
  // Ascending = 1 || Descending = -1
  // Default: Descending
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
          // Descending visit
          total_visit: order,
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

    console.log(post);

    postClass.setPost = post;

    return res.status(200).send({ post: postClass.getPost() });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const postFrontend = {
  getAllPosts,
  getTopAuthors,
  getPostDetail,
};

export default postFrontend;
