import validateBody from "../helpers/validateBody";
import authenticate from "../middlewares/authenticate";
import isEmptyBody from "../middlewares/emptyBody";
import todoControllers from "./../controllers/todoControllers";
import { Router } from "express";

const todoRouter = Router();

todoRouter.use(authenticate);

todoRouter.post("/", isEmptyBody, todoControllers.createTodo);
todoRouter.get("/", todoControllers.getAllTodos);
todoRouter.patch("/:id", todoControllers.updateTodo);
todoRouter.delete("/:id", todoControllers.deleteTodo);

export default todoRouter;
