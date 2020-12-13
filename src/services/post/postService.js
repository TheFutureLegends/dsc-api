import slugify from "slugify";
import db from "../../models/index.js";
import postContainer from "../../containers/post/postContainer.js";

const Post = db.post;

const postContainers = new postContainer();

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
    slug: slugify(body.title.toLowerCase()),
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

const readPost = (posts) => {
  const result = [];

  posts.forEach((value, index) => {
    postContainers.setPost = value;

    result.push(postContainers.getPost());
  });

  return result;
};

const editPost = (post) => {
  postContainers.setPost = post;

  return postContainers.getPost();
};

const updatePost = (post, body) => {
  body.slug = slugify(body.title.toLowerCase());

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
