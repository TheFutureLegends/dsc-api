import express from "express";
import middleware from "../src/middleware/index.js";

import {
  getAllQuestions,
  filterQuestionByCourse,
  findQuestionById,
} from "../src/controllers/forum/forum.controller.js";

import { createAnswer } from "../src/controllers/forum/answer.controller.js";

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

router.get(
  "/question/:id",
  [middleware.authJwt.verifyToken, middleware.authJwt.isMember],
  findQuestionById
);

// Answer route
router.post(
  "/answer/create",
  [middleware.authJwt.verifyToken, middleware.authJwt.isMember],
  createAnswer
);

export default router;
