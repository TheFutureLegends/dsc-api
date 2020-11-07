import slugify from "slugify";
import moment from "moment-timezone";

import db from "../../models/index.js";
import validationRules from "../../validations/index.js";
import middleware from "../../middleware/index.js";
import util from "../../utils/functions.util.js";

const Question = db.question;

const getAllQuestions = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  const questions = await Question.find({
    status: false,
  })
    .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate(["author", "course"])
    .exec();
};

export { getAllQuestions };
