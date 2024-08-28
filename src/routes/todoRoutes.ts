import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  editTodo,
  getTodos,
} from "../controllers/todoControllers";

const router = Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.patch("/:id", editTodo);
router.delete("/:id", deleteTodo);

export default router;
