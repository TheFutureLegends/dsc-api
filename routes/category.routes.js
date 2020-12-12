import express from "express";

import middleware from "../src/middleware/index.js";

import categoryFrontend from "../src/controllers/category/category.frontend.controller.js";

import categoryBackend from "../src/controllers/category/category.backend.controller.js";

const router = express.Router();

router.get("/", categoryFrontend.getAllCategories);

router.get("/:category_name", categoryFrontend.getCategoryByName);

router.post(
  "/create",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  categoryBackend.createCatetory
);

export default router;
