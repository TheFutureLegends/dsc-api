import slugify from "slugify";
import db from "../models/index.js";
import postClasses from "../classes/post.class.js";

const Post = db.post;

const postClass = new postClasses();

const createPost = (body, file, userId, categoryId) => {
  const post = new Post({
    title: body.title,
    slug: slugify(body.title.toLowerCase()),
    description: body.description,
    author: userId,
    category: categoryId,
  });

  post.image = process.env.APP_URL + "/static/upload/" + file.filename;

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
    postClass.setPost = value;

    result.push(postClass.getPost());
  });

  return result;
};

const editPost = (post) => {
  postClass.setPost = post;

  return postClass.getPost();
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

const postCrud = {
  createPost,
  readPost,
  editPost,
  updatePost,
  deletePost,
};

export default postCrud;
