import Joi from "joi";

// Define backend validation
const postSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
});

const postValidation = {
  postSchema,
};

export default postValidation;
