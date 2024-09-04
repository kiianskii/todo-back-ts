import bcrypt from "bcrypt";

import HttpError from "../helpers/HttpError.js";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../helpers/ctrlWrapper";

import { createToken } from "../helpers/jwt.js";

import { RequestHandler, Request, Response, NextFunction } from "express";

const signup: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const user = await authServices.findUser({ email });

  if (user) {
    throw HttpError(409, "User with this email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    email: newUser.email,
    username: newUser.username,
  });
};

const signin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const { _id: id } = user;
  const payload = {
    id: id.toString(),
  };

  const token = createToken(payload);

  await authServices.updateUser({ id: payload.id }, { token });

  res.json({
    token,
    user: {
      email: user.email,
      username: user.username,
    },
  });
};

const getCurrent = (req: Request, res: Response, next: NextFunction) => {
  const { email, username } = req.user;

  res.json({
    email,
    username,
  });
};

const signout = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  await authServices.updateUser({ id: _id }, { token: "" });

  res.json({
    message: "Logout success",
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
};
