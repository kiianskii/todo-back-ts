// import { Todo } from "../models/todoModel";

// const TODOS: Todo[] = [];

// export const createTodo: RequestHandler = (req, res, next) => {
//   const text = (req.body as { text: string }).text;
//   const newTodo = new Todo(Math.random().toString(), text);

//   TODOS.push(newTodo);

//   res.status(201).json({ message: "New Todo created", createdTodo: newTodo });
// };

// export const getTodos: RequestHandler = (req, res, next) => {
//   res.json({ todos: TODOS });
// };

// export const editTodo: RequestHandler<{ id: string }> = (req, res, next) => {
//   const { id } = req.params;
//   const updText = (req.body as { text: string }).text;
//   const todoIndex = TODOS.findIndex((todo) => todo.id === id);

//   if (todoIndex < 0) {
//     throw new Error("Todo was not finded");
//   }

//   TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updText);

//   res.json({ message: "Updated successfully", updatedTodo: TODOS[todoIndex] });
// };

// export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
//   const { id } = req.params;
//   const todoIndex = TODOS.findIndex((todo) => todo.id === id);

//   if (todoIndex < 0) {
//     throw new Error("Todo was not finded");
//   }

//   TODOS.splice(todoIndex, 1);

//   res.json({ message: "Todo deleted" });
// };
import { RequestHandler } from "express";
import HttpError from "../helpers/HttpError";
import ctrlWrapper from "../helpers/ctrlWrapper";
import * as todoServices from "../services/todoServices";
// import getFilterByOwner from "../helpers/getFilterByOwner";

const getAllTodos: RequestHandler = async (req, res, next) => {
  const { _id: owner } = req.user;
  const filter = {
    owner,
  };

  interface reqTypes {
    page: number;
    limit: number;
  }

  const { page = 1, limit = 10 } = req.query;
  const skip = (+page - 1) * +limit;
  const settings = { skip, limit };

  const result = await todoServices.listTodos({ filter, settings });

  res.json(result);
};

const deleteTodo: RequestHandler = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const filter = {
    owner,
    _id,
  };

  const result = await todoServices.removeTodo(filter);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: result,
  });
};

const createTodo: RequestHandler = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await todoServices.addTodo({ ...req.body, owner });
  res.status(201).json(result);
};

const updateTodo: RequestHandler = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const filter = {
    owner,
    _id,
  };
  const result = await todoServices.updateTodoById(filter, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export default {
  getAllTodos: ctrlWrapper(getAllTodos),
  createTodo: ctrlWrapper(createTodo),
  deleteTodo: ctrlWrapper(deleteTodo),
  updateTodo: ctrlWrapper(updateTodo),
};
