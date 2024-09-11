import { RequestHandler } from "express";
import HttpError from "../helpers/HttpError";
import ctrlWrapper from "../helpers/ctrlWrapper";
import * as todoServices from "../services/todoServices";

const getAllTodos: RequestHandler = async (req, res, next) => {
  const { _id: owner } = req.user;
  const filter = {
    owner,
  };

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
