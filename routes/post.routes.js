import express from "express";

import middleware from "../src/middleware/index.js";

import postFrontend from "../src/controllers/post/post.frontend.controller.js";

import postBackend from "../src/controllers/post/post.backend.controller.js";

const router = express.Router();

router.get("/", postFrontend.getAllPosts);

router.get("/top-author", postFrontend.getTopAuthors);

router.get(
  "/read",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.readPost
);

router.post(
  "/create",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  [middleware.imageUpload.single("image")],
  postBackend.createPost
);

router.get(
  "/edit/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.editPost
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
