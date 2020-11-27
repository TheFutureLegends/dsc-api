import express from "express";

import middleware from "../src/middleware/index.js";

import categoryFrontend from "../src/controllers/category/category.frontend.controller.js";

const router = express.Router();

router.get("/", categoryFrontend.getAllCategories);

export default router;
