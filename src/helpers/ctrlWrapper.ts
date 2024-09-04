import { RequestHandler, Request, Response, NextFunction } from "express";

const ctrlWrapper = (ctrl: RequestHandler) => {
  const func: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

export default ctrlWrapper;
