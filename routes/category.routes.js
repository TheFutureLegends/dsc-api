import express from "express";
import middleware from "../src/middleware/index.js";
import {
  //   getAllPosts,
  //   getLatestPost,
  //   displayOwnPosts,
  createCategory,
  updateCategory,
  // deletePost,
} from "../src/controllers/categories/category.controller.js";

const router = express.Router();

// router.get("/", getAllPosts);

// router.get("/latest", getLatestPost);

// router.get(
//   "/display",
//   [middleware.authJwt.verifyToken, middleware.authJwt.isAuthor],
//   displayOwnPosts
// );

router.post(
  "/",
  [middleware.authJwt.verifyToken, middleware.authJwt.isModerator],
  createCategory
);

router.put(
  "/:id",
  [middleware.authJwt.verifyToken, middleware.authJwt.isModerator],
  updateCategory
);

// router.delete(
//   "/:id",
//   [middleware.authJwt.verifyToken, middleware.authJwt.isModerator],
//   deletePost
// );

export default router;
