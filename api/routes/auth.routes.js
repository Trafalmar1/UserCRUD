const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const { body } = require("express-validator/check");

router.post("/login", authController.signIn);
router.post(
  "/sign-up",
  [
    body("email").trim().isEmail(),
    body("password").notEmpty(),
    body("role").notEmpty().isIn(["admin", "user"]),
  ],
  authController.signUp
);

module.exports = router;
