import express from "express";

import middleware from "../src/middleware/index.js";

import commentController from "../src/controllers/comment/comment.controller.js";

const router = express.Router();

/**
 * Get all comments for single post
 * None authentication
 */
router.get("/:post_id", commentController.readComment);

router.post(
  "/:post_id/create",
  [middleware.authJwt.verifyToken],
  commentController.createComment
);

router.get(
  "/:post_id/edit/:comment_id",
  [middleware.authJwt.verifyToken],
  commentController.editComment
);

router.put(
  "/:post_id/update/:comment_id",
  [middleware.authJwt.verifyToken],
  commentController.updateComment
);

router.delete(
  "/:post_id/delete/:comment_id",
  [middleware.authJwt.verifyToken],
  commentController.deleteComment
);

export default router;
