import Joi from "joi";

// Define backend validation
const commentSchema = Joi.object({
  content: Joi.string().required(),
});

const commentValidation = {
  commentSchema,
};

export default commentValidation;
