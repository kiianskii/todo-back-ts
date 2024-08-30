// const messageList: { [key: number]: string } = {
//   400: "Bad Request",
//   401: "Unauthorized",
//   403: "Forbidden",
//   404: "Not Found",
//   409: "Conflict",
// };

// const HttpError = (status: number, message = messageList[status]) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };

// export default HttpError;

// Define a custom error class
class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HttpError"; // Set the error name to distinguish it from other errors
  }
}

// Define the message list with allowed status codes
type StatusCode = 400 | 401 | 403 | 404 | 409;

const messageList: Record<StatusCode, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

// Create a function to generate HttpError instances
const createHttpError = (
  status: StatusCode,
  message: string = messageList[status]
) => {
  return new HttpError(status, message);
};

export default createHttpError;
