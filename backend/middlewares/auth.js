import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Check if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  // no authenticated
  if (!token) {
    return next(
      new ErrorHandler("Il faut se connecter pour accèder à ce ressouce.", 401)
    );
  }

  // if token is there, verify if expired or not
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next(); // after login, move on tawards the next middleware
});

// Authorize user roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // if these roles doesn't contain the current user role,
      return next(
        // then user is not authorized to access this resouce.
        new ErrorHandler(
          `le rôle (${req.user.role}) n'a pas d'accèss à ce ressouce`,
          403
        )
      );
    }
    next(); // move on towards the next middleware in the middleware stack.
  };
};
