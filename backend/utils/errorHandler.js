// extends default error class (ErrorHandler is child class of Error)

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); //super is constructor of parent class. set message in Error
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor); // dev - create stack prop to see entire error stack.
  }
}

export default ErrorHandler;
