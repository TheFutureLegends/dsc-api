import slugify from "slugify";
import db from "../../models/index.js";
import commentContainer from "../../containers/comment/commentContainer.js";

const Comment = db.comment;

const commentContainers = new commentContainer();

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
    commentContainers.setComment = value;

    result.push(commentContainers.getComment());
  });

  return result;
};

const editComment = () => {};

const updateComment = () => {
  return {
    status: 204,
    message: "Comment Deleted Successfully!",
  };
};

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
