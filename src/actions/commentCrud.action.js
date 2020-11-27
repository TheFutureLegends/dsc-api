import slugify from "slugify";
import db from "../models/index.js";
import commentClasses from "../classes/comment.class.js";

const Comment = db.comment;

const commentClass = new commentClasses();

const createComment = (body, postId, userId) => {
  const comment = new Comment({
    content: body.content,
    post: postId,
    author: userId,
  });

  comment.save((err, comment) => {
    if (err) {
      return {
        status: 400,
        message: err.message,
      };
    }
  });

  return {
    status: 201,
    message: "Comment Created Successfully",
  };
};

const readComment = (comments) => {
  const result = [];

  comments.forEach((value, index) => {
    commentClass.setComment = value;

    result.push(commentClass.getComment());
  });

  return result;
};

const editComment = () => {};

const updateComment = () => {};

const deleteComment = (comment) => {
  comment.deleteOne((err, comment) => {
    if (err) {
      return {
        status: 400,
        message: err.message,
      };
    }
  });

  return {
    status: 204,
    message: "Comment Deleted Successfully!",
  };
};

const commentCrud = {
  createComment,
  readComment,
  editComment,
  updateComment,
  deleteComment,
};

export default commentCrud;
