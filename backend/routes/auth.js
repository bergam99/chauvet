import express from "express";
import {
  loginUser,
  logout,
  registerUser,
} from "../controllers/authController.js";

const router = express.Router(); // define router

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

export default router;
