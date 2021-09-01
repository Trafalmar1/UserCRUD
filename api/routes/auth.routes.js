const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

router.post("/login", authController.signIn);
router.post("/sign-up", authController.signUp);

module.exports = router;
