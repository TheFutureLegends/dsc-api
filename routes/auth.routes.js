import express from "express";

import middleware from "../src/middleware/index.js";
import { signin, signup } from "../src/controllers/auth/auth.controller.js";

const router = express.Router();

router.post(
  "/signup",
  [
    middleware.verifySignUp.checkDuplicateUsernameOrEmail,
    middleware.verifySignUp.checkRolesExisted,
  ],
  signup
);

router.post("/signin", signin);

export default router;
