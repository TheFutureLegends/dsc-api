import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email().required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const passwordSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  confirm_password: Joi.ref("password"),
});

const userValidation = {
  userSchema,
  passwordSchema,
};

export default userValidation;
