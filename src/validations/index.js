import authValidation from "./auth/auth.validation.js";
// import userValidation from "./user.validation.js";
import postValidation from "./post/post.validation.js";
import commentValidation from "./comment/comment.validation.js";

const validationRules = {
  authValidation,
  //   userValidation,
  postValidation,
  commentValidation,
};

export default validationRules;
