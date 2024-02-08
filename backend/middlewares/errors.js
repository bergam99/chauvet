import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  // create error object
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };

  // Handle Invalid Mongoose ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err?.path}`;
    error = new ErrorHandler(message, 404);
  }

  // Handle Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
    error = new ErrorHandler(message, 400);
  }

  // error in DEV (complex error message)
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    // send back the response
    res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }

  // error in PROD (simple error message, show to the user)
  if (process.env.NODE_ENV === "PRODUCTION") {
    // send back the response
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
};
