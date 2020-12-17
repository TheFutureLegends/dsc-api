import utilities from "../../utilities/index.js";
import db from "../../models/index.js";
import postContainer from "../../containers/post/postContainer.js";

const Post = db.post;

const postContainers = new postContainer();

/**
 *
 * @param {Array} posts
 * @return {Array of Object} result
 */
const readPost = (posts) => {
  const result = [];

  postContainers.setIsList = true;

  posts.forEach((value, index) => {
    postContainers.setPost = value;

    result.push(postContainers.getPost());
  });

  return result;
};

/**
 *
 * @param {*} body
 * @param {*} file
 * @param {*} userId
 * @param {*} categoryId
 */
const createPost = (body, userId, categoryId) => {
  const post = new Post({
    title: body.title,
    description: body.description,
    image: body.imageFile,
    author: userId,
    category: categoryId,
  });

  // post.image = process.env.APP_URL + "/static/upload/" + file.filename;

  post.save((err, post) => {
    if (err) {
      return {
        status: 400,
        message: err.message,
      };
    }
  });

  return {
    status: 201,
    message: "Post Created Successfully",
  };
};

const editPost = (post) => {
  postContainers.setPost = post;

  return {
    status: 200,
    message: "Load post successfully!",
    data: postContainers.getPost(),
  };
};

const updatePost = (post, body) => {
  if (body.title) {
    body.slug = utilities.converter.converStringToSlug(body.title);
  }

  post.updateOne(body, (err, post) => {
    if (err) {
      return {
        status: 400,
        message: err.message,
      };
    }
  });

  return {
    status: 204,
    message: "Post Updated Successfully!",
  };
};

const deletePost = (post) => {
  post.deleteOne((err, post) => {
    if (err) {
      return {
        status: 400,
        message: err.message,
      };
    }
  });

  return {
    status: 204,
    message: "Post Deleted Successfully!",
  };
};

const postServices = {
  createPost,
  readPost,
  editPost,
  updatePost,
  deletePost,
};

export default postServices;
