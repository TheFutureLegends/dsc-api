import express from "express";
import middleware from "../src/middleware/index.js";
import postController from "../src/controllers/post/postController.js";

const router = express.Router();

/**
 * Get all posts
 *
 * Default route: /api/posts?latest=false&asc=true&sortBy=createdAt&limit=10&page=1
 *
 * @return Object (Array of Object posts - Integer currentPage - Integer totalPage)
 */
router.get("/", postController.getAllPosts);

/**
 * Get top author
 *
 * Default route: /api/posts/top-author?limit=10&asc=false
 *
 * @return Object
 */
router.get("/top-author", postController.getTopAuthors);

/**
 * Begin router that only authenticated user can do
 *
 * Only authenticated user with role author can do (Later version for only author)
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
router.get("/read", [middleware.authJwt.verifyToken], postController.readPost);

/**
 * Create new post
 *
 * @return status 201 (Created) - String message
 */
router.post(
  "/create",
  [middleware.authJwt.verifyToken],
  // [middleware.checkFileAndUpload.single("imageFile")],
  postController.createPost
);

/**
 * Get specific post to prepare updating
 *
 * @params id
 * @return Object
 */
router.get(
  "/edit/:id",
  [middleware.authJwt.verifyToken],
  postController.editPost
);

/**
 * Update specific post
 *
 * Inside controller will use put methodology
 * Inside postService will use patch method: updateOne
 *
 * The only method that works with patch to use in controller is: findByIdAndUpdate
 *
 * @params id
 * @return status 204 (No content) - Object has key: message and value of string
 */
router.patch(
  "/update/:id",
  [middleware.authJwt.verifyToken],
  postController.updatePost
);

/**
 * Delete specific post
 *
 * @params id
 * @return status 204 (No content) - String message
 */
router.delete(
  "/delete/:id",
  [middleware.authJwt.verifyToken],
  postController.deletePost
);

/**
 * End router that only author can do
 */

/**
 * Get specific post
 *
 * @params category slug
 * @return Object
 */

router.get(
  "/getMorePostsWithSameCategory/:category",
  postController.getMorePostsWithSameCategory
);

/**
 * Get specific post
 *
 * @params slug
 * @return Object
 */
router.get("/:slug", postController.getPostDetail);

export default router;
