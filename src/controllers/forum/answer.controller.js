import slugify from "slugify";
import moment from "moment-timezone";

import db from "../../models/index.js";
import validationRules from "../../validations/index.js";
import middleware from "../../middleware/index.js";
import util from "../../utils/functions.util.js";

import { getUser } from "../../config/auth.config.js";

const Question = db.question;

const Answer = db.answer;

const createAnswer = async (req, res) => {
  //   const { error } = validationRules.questionValidation.questionSchema.validate(
  //     req.body
  //   );

  //   if (error) return res.status(400).send(error.details[0].message);

  const user = await getUser(req.userId);

  const answer = new Answer({
    content: req.body.content,
    university: user.university,
    question: req.body.question_id,
    author: user._id,
  });

  answer.save((err, answer) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    console.log(answer._id);

    Question.findByIdAndUpdate(
      req.body.question_id,
      {
        $addToSet: { answers: [answer._id] },
      },
      (err, result) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
      }
    );
  });

  return res.status(200).send({ message: "You have posted an answer!" });
};

export { createAnswer };
