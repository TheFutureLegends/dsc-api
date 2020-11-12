import express from "express";
import middleware from "../src/middleware/index.js";

import {
  getAllQuestions,
  filterQuestionByCourse,
} from "../src/controllers/forum/forum.controller.js";

const router = express.Router();

router.get(
  "/questions",
  [middleware.authJwt.verifyToken, middleware.authJwt.isMember],
  getAllQuestions
);

router.get(
  "/questions/filter",
  [middleware.authJwt.verifyToken, middleware.authJwt.isMember],
  filterQuestionByCourse
);

export default router;
