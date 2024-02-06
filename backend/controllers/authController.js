import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import ErorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

// Register user => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Create New User
  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// Login user => /api/v1/register
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErorHandler("Entrez votre mail et mot de passe", 400));
  }

  // Find user in the db
  const user = await User.findOne({ email }).select("+password"); // compare pwd too

  if (!user) {
    return next(new ErorHandler("Invalid mail ou mot de passe", 401));
  }

  // Check if pwd is correct
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErorHandler("Invalid mail ou mot de passe", 401));
  }

  sendToken(user, 201, res);
});

// Logout user   =>  /api/v1/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()), // expire date = current date
    httpOnly: true,
  });

  res.status(200).json({
    message: "Déconnecté",
  });
});
