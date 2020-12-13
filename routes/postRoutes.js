import express from "express";

import middleware from "../src/middleware/index.js";

import postFrontend from "../src/controllers/post/post.frontend.controller.js";

import postBackend from "../src/controllers/post/post.backend.controller.js";

const router = express.Router();

// get all posts
// default: /api/posts?latest=false&asc=true&sortBy=createdAt&limit=10&page=1
router.get("/", postFrontend.getAllPosts);

// Get top author
// default: /api/posts/top-author?limit=10&asc=false
router.get("/top-author", postFrontend.getTopAuthors);

// get post
router.get(
  "/read",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.readPost
);

// Create post
router.post(
  "/create",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  // [middleware.imageUpload.single("image")],
  postBackend.createPost
);

// Get post for update
router.get(
  "/edit/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.editPost
);

router.patch(
  "/patch/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.patchPost
);

router.put(
  "/update/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.updatePost
);

router.delete(
  "/delete/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.deletePost
);

router.get("/:slug", postFrontend.getPostDetail);

export default router;
