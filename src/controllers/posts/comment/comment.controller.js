import slugify from "slugify";

import db from "../../../models/index.js";
import validationRules from "../../../validations/index.js";
import middleware from "../../../middleware/index.js";
import util from "../../../utils/functions.util.js";
import { getUser } from "../../../config/auth.config.js";

const Comment = db.comment;

const getAllComments = async (req, res) => {
  const comments = await Comment.find({
    post_id: req.params.post_id,
    parent: null,
  }).exec();

  return res.status(200).send({ comments: comments });
};

const createComment = async (req, res) => {
  // Validate input
  //   const { error } = validationRules.postValidation.postSchema.validate(
  //     req.body
  //   );
  //   if (error) return res.status(400).send(error.details[0].message);
  const user = await getUser(req.userId);

  const comment = new Comment({
    content: req.body.content,
    post_id: req.params.post_id,
    author: req.userId,
  });
};

export { getAllComments, createComment };
