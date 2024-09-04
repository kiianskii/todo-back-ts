import express from "express";
import validateBody from "../helpers/validateBody";
import isEmptyBody from "../middlewares/emptyBody";

import { authSignupSchema, authSigninSchema } from "../schemas/authSchemas";

import authControllers from "../controllers/authControllers";
import authenticate from "../middlewares/authenticate";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(authSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(authSigninSchema),
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.signout);

export default authRouter;
