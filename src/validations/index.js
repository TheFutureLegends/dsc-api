import authValidation from "./auth.validation.js";
import userValidation from "./user.validation.js";
import postValidation from "./post.validation.js";
import questionValidation from "./question.validation.js";

const validationRules = {
  authValidation,
  userValidation,
  postValidation,
  questionValidation,
};

export default validationRules;
