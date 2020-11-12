import Joi from "joi";

// Define backend validation
const questionSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  course_code: Joi.string().required(),
});

const questionValidation = {
  questionSchema,
};

export default questionValidation;
