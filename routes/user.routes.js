import express from "express";
import middleware from "../src/middleware/index.js";
import {
  allAccess,
  moderatorBoard,
  adminBoard,
  getProfile,
} from "../src/controllers/users/user.controller.js";

const router = express.Router();

router.get("/all", allAccess);

router.get("/profile", [middleware.authJwt.verifyToken], getProfile);

router.get(
  "/mod",
  [middleware.authJwt.verifyToken, middleware.authJwt.isModerator],
  moderatorBoard
);

router.get(
  "/admin",
  [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
  adminBoard
);

export default router;
