import express from "express";

import middleware from "../src/middleware/index.js";

import commentController from "../src/controllers/comment/comment.controller.js";

const router = express.Router();

/**
 * Get all comments for single post
 * None authentication
 */
router.get("/:post_id", commentController.readComment);

/**
 * Below route needs user to be authenticated
 * 
 * All routes below will go through middleware to do:
 *   - verify if token pass in header is valid or not
 */

/**
 * Create new comment
 * 
 * @params post_id
 * @return Status 204 - Object has key: message and value of String
 */
router.post(
  "/:post_id/create",
  [middleware.authJwt.verifyToken],
  commentController.createComment
);

/**
 * Get specific comment for editing
 * 
 * @params post_id
 * @params comment_id
 * 
 * @return Object
 */
router.get(
  "/:post_id/edit/:comment_id",
  [middleware.authJwt.verifyToken],
  commentController.editComment
);

/**
 * Update specific comment
 * 
 * @params post_id
 * @params comment_id
 * 
 * @return Status 204 - Object has key: message and value of String
 */
router.put(
  "/:post_id/update/:comment_id",
  [middleware.authJwt.verifyToken],
  commentController.updateComment
);

/**
 * Delete specific comment
 * 
 * @params post_id
 * @params comment_id
 * 
 * @return Status 204 - Object has key: message and value of String
 */
router.delete(
  "/:post_id/delete/:comment_id",
  [middleware.authJwt.verifyToken],
  commentController.deleteComment
);

export default router;
