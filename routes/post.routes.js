import express from "express";
import middleware from "../src/middleware/index.js";
import {
  createPost,
  updatePost,
  deletePost,
} from "../src/controllers/posts/post.controller.js";

const router = express.Router();

// router.get("/", allAccess);

// router.get("/user", [middleware.authJwt.verifyToken], userBoard);

router.post(
  "/",
  [
    middleware.authJwt.verifyToken,
    middleware.authJwt.isAuthor,
  ],
  createPost
);

router.put(
  "/:id",
  [
    middleware.authJwt.verifyToken,
    middleware.authJwt.isAuthor,
  ],
  updatePost
);

router.delete(
  "/:id",
  [
    middleware.authJwt.verifyToken,
    middleware.authJwt.isAuthor,
  ],
  deletePost
);

export default router;
