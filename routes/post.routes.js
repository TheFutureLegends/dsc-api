import express from "express";
import middleware from "../src/middleware/index.js";
import {
  getTopAuthors,
  getAllPosts,
  getLatestPost,
  getPost,
  displayOwnPosts,
  showPost,
  createPost,
  updatePost,
  deletePost,
} from "../src/controllers/posts/post.controller.js";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/latest", getLatestPost);

router.get("/top-author", getTopAuthors);

router.get(
  "/display",
  [middleware.authJwt.verifyToken, middleware.authJwt.isAuthor],
  displayOwnPosts
);

router.get(
  "/show/:slug",
  [middleware.authJwt.verifyToken, middleware.authJwt.isAuthor],
  showPost
);

router.post(
  "/",
  [middleware.authJwt.verifyToken, middleware.authJwt.isAuthor],
  [middleware.fileUpload.single("image")],
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

router.get("/:slug", getPost);

export default router;
