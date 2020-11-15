import slugify from "slugify";
import ISODate from "isodate";
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
  const q_array = [];

  const { limit = 10, page = 1 } = req.query;

  const user = await getUser(req.userId);

  const questions = await Question.aggregate([
    {
      $match: {
        university: user.university,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$answers",
    } /* this converts arrays into unique documents for counting */,
    {
      $group: {
        /* execute 'grouping' */
        _id: "$_id" /* using the 'id' value as the _id */,
        title: { $first: "$title" } /* add the 'title' value */,
        slug: { $first: "$slug" } /* using the 'slug' value */,
        author: {
          $first: {
            username: "$author.username",
            avatar: "$author.avatar",
          },
        } /* using the 'author' value from lookup */,
        status: { $first: "$status" } /* using the 'status' value */,
        createdAt: { $first: "$createdAt" } /* using the 'createdAt' value */,
        totalAnswers: { $sum: 1 } /* create a sum value */,
      },
    },
    {
      $limit: limit,
    },
    {
      $skip: (page - 1) * limit,
    },
  ]);

  questions.forEach((question, index) => {
    q_array.push({
      _id: question._id,
      title: question.title,
      slug: question.slug,
      author: {
        username: question.author.username[0],
        avatar: question.author.avatar[0],
      },
      status: question.status,
      createdAt: util.formatDate(question.createdAt),
      totalAnswers: question.totalAnswers,
    });
  });

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

const findQuestionById = async (req, res) => {
  const user = await getUser(req.userId);

  try {
    const question = await Question.findOne({
      _id: req.params.id,
      university: user.university,
    })
      .populate(["author", "course", "answers"])
      .populate({
        path: "answers",
        populate: { path: "author" },
      })
      .exec();

    if (!question) {
      return res.status(404).send({ message: "Question not found" });
    }

    return res.status(200).send({
      question: util.getQuestionObject(question),
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const createQuestion = async (req, res) => {
  const { error } = validationRules.questionValidation.questionSchema.validate(
    req.body
  );

  if (error) return res.status(400).send(error.details[0].message);

  const user = await getUser(req.userId);

  const course = await Course.findOne({
    code: req.body.code.toUpperCase(),
  }).exec();

  if (!course) {
    return res.status(404).send({ message: "Course not found!" });
  }

  const question = new Question({
    title: req.body.title,
    slug: slugify(req.body.title.toLowerCase()),
    content: req.body.content,
    author: req.userId,
    university: user.university,
    course: course._id,
  });

  question.save((err, question) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  return res.status(201).send({ message: "New question has been created!" });
};

export {
  getAllQuestions,
  filterQuestionByCourse,
  findQuestionById,
  createQuestion,
};
