import createHttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt";
import { findUser } from "../services/authServices.js";
import { RequestHandler } from "express";

const authenticate: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(createHttpError(401, "Authorization header not found"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(createHttpError(401, "Bearer not found"));
  }

  const { error, payload } = verifyToken(token);
  if (error) {
    return next(createHttpError(401, error.message));
  }

  if (!payload) {
    return next(createHttpError(401, "Invalid token payload"));
  }

  const { id } = payload;

  const user = await findUser({ _id: id });
  if (!user) {
    return next(createHttpError(401, "User not found"));
  }

  if (!user.token) {
    return next(createHttpError(401, "User already logged out"));
  }

  //   req.user = user;

  next();
};

export default authenticate;
