import Joi from "joi";

// Define backend validation
const postSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  imageFile: Joi.string(),
  category: Joi.string().required(),
});

const postValidation = {
  postSchema,
};

export default postValidation;
