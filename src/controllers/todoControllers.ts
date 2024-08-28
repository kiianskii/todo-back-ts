import { RequestHandler } from "express";
import { Todo } from "../models/todoModel";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "New Todo created", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const editTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const { id } = req.params;
  const updText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex((todo) => todo.id === id);

  if (todoIndex < 0) {
    throw new Error("Todo was not finded");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updText);

  res.json({ message: "Updated successfully", updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const { id } = req.params;
  const todoIndex = TODOS.findIndex((todo) => todo.id === id);

  if (todoIndex < 0) {
    throw new Error("Todo was not finded");
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: "Todo deleted" });
};
