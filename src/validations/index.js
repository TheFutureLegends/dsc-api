import authValidation from "./auth.validation.js";
import userValidation from "./user.validation.js";
import postValidation from "./post.validation.js";

const validationRules = {
  authValidation,
  userValidation,
  postValidation,
};

export default validationRules;
