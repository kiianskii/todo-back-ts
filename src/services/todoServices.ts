import Todo from "../models/Todo";
import { Schema } from "mongoose";

interface Params {
  filter: { text?: string; owner?: Schema.Types.ObjectId };
  fields?: {};
  settings?: {};
}

type Filter = {
  _id: string;
};
type Data = {
  text: string;
  owner: Schema.Types.ObjectId;
};
export const listTodos = (params: Params) => {
  const { filter, fields, settings } = params;
  return Todo.find(filter, fields, settings);
};

export const removeTodo = (filter: Filter) => Todo.findOneAndDelete(filter);
export const addTodo = (data: Data) => Todo.create(data);
export const updateTodoById = (filter: Filter, data: Data) =>
  Todo.findOneAndUpdate(filter, data);
