import express from "express";
import middleware from "../src/middleware/index.js";
import { getProfile } from "../src/controllers/users/user.controller.js";

const router = express.Router();

router.get("/profile", [middleware.authJwt.verifyToken], getProfile);

export default router;
