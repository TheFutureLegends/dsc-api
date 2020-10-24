import express from "express";
import middleware from "../src/middleware/index.js";
import {
  //   getAllPosts,
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../src/controllers/categories/category.controller.js";

const router = express.Router();

// router.get("/", getAllPosts);

router.get("/", getAllCategories);

router.get("/:slug", getSingleCategory);

router.post(
  "/",
  [middleware.authJwt.verifyToken, middleware.authJwt.isModerator],
  createCategory
);

router.put(
  "/update/:id",
  [middleware.authJwt.verifyToken, middleware.authJwt.isModerator],
  updateCategory
);

router.delete(
  "/delete/:id",
  [middleware.authJwt.verifyToken, middleware.authJwt.isModerator],
  deleteCategory
);

export default router;
