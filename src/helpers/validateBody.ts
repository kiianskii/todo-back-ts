import HttpError from "./HttpError.js";
import Joi from "joi";
// import { RequestHandler } from "express";
import { RequestHandler, Request, Response, NextFunction } from "express";

const validateBody = (schema: Joi.ObjectSchema<any>) => {
  const func: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
