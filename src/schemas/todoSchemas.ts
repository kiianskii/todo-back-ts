import Joi from "joi";

export const todoAddSchema = Joi.object({
  text: Joi.string().required(),
});
