import express from "express";
import { registerUser } from "../controllers/authController.js";
// import { registerUser } from "../controllers/authController";

const router = express.Router(); // define router

router.route("/register").post(registerUser);

export default router;
