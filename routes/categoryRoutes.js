import express from "express";

import middleware from "../src/middleware/index.js";

import categoryFrontend from "../src/controllers/category/category.frontend.controller.js";

import categoryBackend from "../src/controllers/category/category.backend.controller.js";

const router = express.Router();

/**
 * Get all categories without _id
 *
 * @return Object
 */
router.get("/", categoryFrontend.getAllCategories);

/**
 * Begin router that only admin can do
 *
 * All routes below will go through middleware to do:
 *   - verify if token pass in header is valid or not
 *   - check if logged in user has associate role to begin action or not
 */

/**
 * Read all categories from database along with _id
 *
 * @return
 *   - status 200 (OK) - Object has key:message and data (data is an array of object)
 *   - status 400 (Bad request) - Object has key: message and data (data is null)
 */
router.get(
  "/read",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  categoryBackend.readCategory
);

/**
 * Create new category
 *
 * @return status 204 (No content) - Object has key: message and value of string
 */
router.post(
  "/create",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  categoryBackend.createCategory
);

/**
 * Get specific category for editing
 *
 * @params String slug
 * @return
 *   - status 200 (OK) - Object has key:message and data (data is an object)
 *   - status 404 (Not found) - Object has key: message and data (data is null)
 */
router.get(
  "/edit/:slug",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  categoryBackend.editCategory
);

/**
 * Update specific category
 *
 * @params category_id
 * @return
 *   - status 200 (OK) - Object has key:message and data (data is an array of object)
 *   - status 400 (Bad request) - Object has key: message and data (data is null)
 */
router.patch("/update/:slug", [
  middleware.authJwt.verifyToken,
  middleware.permission.isAdmin,
]);

/**
 * Delete specific category
 *
 * @params category_id
 * @return status 204 (No content) - Object has key: message and value of string
 */
router.delete("/delete/:id", [
  middleware.authJwt.verifyToken,
  middleware.permission.isAdmin,
]);
/**
 * End router that only admin can do
 */

/**
 * Get specific category
 *
 * @params String category_name
 * @return Object
 */
router.get("/:category_name", categoryFrontend.getCategoryByName);

export default router;
