import express from "express";
import middleware from "../src/middleware/index.js";
import {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../src/controllers/categories/category.controller.js";

const router = express.Router();

router.get("/", getAllCategories);

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

router.get("/:slug", getSingleCategory);

export default router;
