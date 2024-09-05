import { Schema, model } from "mongoose";

import { handleError, setUpdateSettings } from "./hooks";

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Set text for todo"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: [true, "Set owner for todo"],
    },
  },
  { versionKey: false }
);

todoSchema.post("save", handleError);

todoSchema.pre("findOneAndUpdate", setUpdateSettings);

todoSchema.post("findOneAndUpdate", handleError);

const Todo = model("user", todoSchema);

export default Todo;
