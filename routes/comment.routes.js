import express from "express";
import middleware from "../src/middleware/index.js";
import {
  getAllComments,
  createComment,
} from "../src/controllers/posts/comment/comment.controller.js";

const router = express.Router();

router.post(
  "/:post_id/create",
  [middleware.authJwt.verifyToken],
  createComment
);

export default router;
