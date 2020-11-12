import Joi from "joi";

// Define backend validation
const questionSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  course_code: Joi.string().required(),
});

const answerSchema = Joi.object({
  content: Joi.string().required(),
  question_id: Joi.string().required(),
});

const questionValidation = {
  questionSchema,
  answerSchema,
};

export default questionValidation;
