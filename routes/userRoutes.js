import express from "express";

import middleware from "../src/middleware/index.js";
import userController from "../src/controllers/user/user.controller.js";

const router = express.Router();

/**
 * Get profile of logged in
 *
 * @return Object
 */
router.get(
  "/profile",
  [middleware.authJwt.verifyToken],
  userController.getUserProfile
);

/**
 * Begin router that only admin can do
 *
 * All routes below will go through middleware to do:
 *   - verify if token pass in header is valid or not
 *   - check if logged in user has associate role to begin action or not
 */

/**
 * Get all users
 *
 * @return Object
 */
router.get(
  "/read",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  userController.readUser
);

/**
 * Create new user
 *
 * @return null (status 201 - Object has key message and value is String)
 */
router.post(
  "/create",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  userController.createUser
);

/**
 * Get specific user
 *
 * @params id
 * @return Object
 */
router.get(
  "/edit/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  userController.editUser
);

/**
 * Update specific user
 *
 * @params id
 * @return null (Status 204 - Object has key message and value of string)
 */
router.put(
  "/update/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  userController.updateUser
);

/**
 * Delete specific user
 *
 * @params id
 * @return null (Status 204 - Object has key message and value of string)
 */
router.delete(
  "/delete/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  userController.deleteUser
);

/**
 * End router that only admin can do
 */

/**
 * Get user detail
 *
 * @params String username
 * @return Object
 */
router.get("/:username", userController.getProfile);

export default router;
