import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().min(3).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const registerSchema = Joi.object({
  username: Joi.string().min(6).required(),

  email: Joi.string().email().required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  confirm_password: Joi.ref("password"),

  roles: Joi.array(),
});

const authValidation = {
  loginSchema,
  registerSchema,
};

export default authValidation;
