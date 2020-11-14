import slugify from "slugify";
import moment from "moment-timezone";

import db from "../../models/index.js";
import validationRules from "../../validations/index.js";
import middleware from "../../middleware/index.js";
import util from "../../utils/functions.util.js";

import { getUser } from "../../config/auth.config.js";

const Course = db.course;

const Question = db.question;

const Answer = db.answer;

const getAllQuestions = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  const user = await getUser(req.userId);

  // result will be an array of Object
  const questions = await Question.find({
    status: false,
    university: user.university,
  })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate(["author", "course", "answers"])
    .populate({
      path: "answers",
      populate: { path: "author" },
    })
    .exec();

  const q_array = util.iterateQuestionObject(questions);

  return res.status(200).send({ questions: q_array });
};

const filterQuestionByCourse = async (req, res) => {
  try {
    const user = await getUser(req.userId);

    const course = await Course.findOne({
      code: req.query.code.toUpperCase(),
    }).exec();

    const questions = await Question.find({
      university: user.university,
      course: course._id,
    })
      .populate(["author", "course"])
      .exec();

    const q_array = util.iterateQuestionObject(questions);

    return res.status(200).send({ questions: q_array });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const createQuestion = async (req, res) => {
  const { error } = validationRules.questionValidation.questionSchema.validate(
    req.body
  );

  if (error) return res.status(400).send(error.details[0].message);
};

export { getAllQuestions, filterQuestionByCourse, createQuestion };
