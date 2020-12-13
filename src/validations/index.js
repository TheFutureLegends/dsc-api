import authValidation from "./auth/authValidation.js";
// import userValidation from "./user.validation.js";
import postValidation from "./post/postValidation.js";
import commentValidation from "./comment/commentValidation.js";

const validationRules = {
  authValidation,
  //   userValidation,
  postValidation,
  commentValidation,
};

export default validationRules;
