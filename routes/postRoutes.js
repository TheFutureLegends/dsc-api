import express from "express";

import middleware from "../src/middleware/index.js";

import postFrontend from "../src/controllers/post/post.frontend.controller.js";

import postBackend from "../src/controllers/post/post.backend.controller.js";

const router = express.Router();

/**
 * Get all posts
 * 
 * Default route: /api/posts?latest=false&asc=true&sortBy=createdAt&limit=10&page=1
 * 
 * @return Object (Array of Object posts - Integer currentPage - Integer totalPage)
 */
router.get("/", postFrontend.getAllPosts);

/**
 * Get top author
 * 
 * Default route: /api/posts/top-author?limit=10&asc=false
 * 
 * @return Object
 */
router.get("/top-author", postFrontend.getTopAuthors);

/**
 * Begin router that only author can do
 * 
 * Only authenticated user with role author can do
 * 
 * All routes below will go through middleware to do:
 *   - verify if token pass in header is valid or not
 *   - check if logged in user has associate role to begin action or not
 */

/**
 * Get all posts that own by author
 * 
 * @return Object
 */
router.get(
  "/read",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.readPost
);

/**
 * Create new post
 * 
 * @return status 201 (Created) - String message
 */
router.post(
  "/create",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  // [middleware.checkFileAndUpload.single("imageFile")],
  postBackend.createPost
);

/**
 * Get specific post to prepare updating
 * 
 * @params id
 * @return Object
 */
router.get(
  "/edit/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.editPost
);

/**
 * Update specific post using patch
 * 
 * Does not work
 */
router.patch(
  "/patch/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.patchPost
);

/**
 * Update specific post using put
 * 
 * Working
 * 
 * @params id
 * @return status 204 (No content) - Object has key: message and value of string
 */
router.put(
  "/update/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.updatePost
);

/**
 * Delete specific post
 * 
 * @params id
 * @return status 204 (No content) - String message
 */
router.delete(
  "/delete/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAuthor],
  postBackend.deletePost
);

/**
 * End router that only author can do
 */

/**
 * Get specific post
 * 
 * @params slug
 * @return Object
 */
router.get("/:slug", postFrontend.getPostDetail);

export default router;
