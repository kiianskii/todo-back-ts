import Joi from "joi";

export const authSignupSchema = Joi.object({
  password: Joi.string().required(),
  username: Joi.string().min(3).required(),
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
});

export const authSigninSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
});
