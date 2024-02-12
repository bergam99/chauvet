import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "entrez votre nom."],
      maxLength: [50, "votre nom ne doit pas excèder 50 caractères."],
    },
    email: {
      type: String,
      required: [true, "entrez votre e-mail."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "entrez votre mot de passe."],
      minLength: [
        6,
        "votre mot de passe doit être plus longue que 6 caractères.",
      ],
      select: false,
    },
    // avatar: {
    //   public_id: String,
    //   url: String,
    // },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Encrypting password before saving the user
userSchema.pre("save", async function (next) {
  // before saving the user, run this function
  if (!this.isModified("password")) {
    // if pwd is not modified
    next(); // move on to the next model
  }
  // if pwd is modified, use bcrypt package, hash that pwd and save into password field db.
  this.password = await bcrypt.hash(this.password, 10);
});

// Return JWT Token
userSchema.methods.getJwtToken = function () {
  // sign : assgin a token to the user
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME, // expiry date
  });
};

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Gernerate reset token
  const resetToken = crypto.randomBytes(20).toString("hex"); // crypto : package that generate random string

  // Hash and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256") //algorithm
    .update(resetToken)
    .digest("hex");

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30m * 60s * 1000"

  return resetToken;
};

export default mongoose.model("User", userSchema);
