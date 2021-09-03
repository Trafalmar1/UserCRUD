const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const { body } = require("express-validator/check");

router.post(
  "/login",
  [body("email").trim().isEmail(), body("password").trim().notEmpty()],
  authController.signIn
);
router.post(
  "/sign-up",
  [
    body("username").trim().notEmpty(),
    body("email").trim().isEmail(),
    body("password").trim().notEmpty(),
    body("role").notEmpty().isIn(["admin", "user"]),
  ],
  authController.signUp
);

module.exports = router;
