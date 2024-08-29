import { Schema } from "mongoose";
import { MongoError } from "mongodb";

// Розширений тип помилки для включення властивості `status`
interface CustomError extends Error {
  status?: number;
  code?: number; // Додаємо код помилки
}

export const handleError = (
  error: MongoError | CustomError,
  data: any,
  next: (err?: CustomError) => void
) => {
  // Перевірка типу помилки
  if (error instanceof MongoError) {
    const { name, code } = error;
    if (name === "MongoServerError" && code === 11000) {
      (error as CustomError).status = 409; // Conflict
    } else {
      (error as CustomError).status = 400; // Bad Request
    }
  } else {
    (error as CustomError).status = 500; // Internal Server Error
  }
  next(error as CustomError);
};

interface CustomSchema extends Schema {
  options: {
    new?: boolean;
    runValidators?: boolean;
  };
}

export const setUpdateSettings = function (
  this: CustomSchema,
  next: () => void
) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};

// export const handleError = (error, data, next) => {
//   const { name, code } = error;
//   error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
//   next();
// };

// export const setUpdateSettings = function (next) {
//   this.options.new = true;
//   this.options.runValidators = true;
//   next();
// };
