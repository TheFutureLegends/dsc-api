import express from "express";
import middleware from "../src/middleware/index.js";
import {
  checkRole,
  getProfile,
} from "../src/controllers/users/user.controller.js";

const router = express.Router();

router.get("/profile", [middleware.authJwt.verifyToken], getProfile);

router.get("/check/", [middleware.authJwt.verifyToken], checkRole);

export default router;
