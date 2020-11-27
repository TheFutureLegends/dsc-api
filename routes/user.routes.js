import express from "express";

import middleware from "../src/middleware/index.js";
import userController from "../src/controllers/user/user.controller.js";

const router = express.Router();

router.get(
  "/profile",
  [middleware.authJwt.verifyToken],
  userController.getUser
);

router.get(
  "/read",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  userController.readUser
);

router.post(
  "/create",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  userController.createUser
);

router.get(
  "/edit/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  userController.editUser
);

router.put(
  "/update/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  userController.updateUser
);

router.delete(
  "/delete/:id",
  [middleware.authJwt.verifyToken, middleware.permission.isAdmin],
  userController.deleteUser
);

router.get("/:username", userController.getProfile);

export default router;
