import express from "express";
import middleware from "../src/middleware/index.js";
import {
  getAllPosts,
  getLatestPost,
  getSinglePost,
  displayOwnPosts,
  createPost,
  updatePost,
  deletePost,
} from "../src/controllers/posts/post.controller.js";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/latest", getLatestPost);

router.get("/detail/:slug", getSinglePost);

router.get(
  "/display",
  [middleware.authJwt.verifyToken, middleware.authJwt.isAuthor],
  displayOwnPosts
);

router.post(
  "/",
  [middleware.authJwt.verifyToken, middleware.authJwt.isAuthor],
  createPost
);

router.put(
  "/update/:id",
  [middleware.authJwt.verifyToken, middleware.authJwt.isAuthor],
  updatePost
);

router.delete(
  "/delete/:id",
  [middleware.authJwt.verifyToken, middleware.authJwt.isAuthor],
  deletePost
);

export default router;
