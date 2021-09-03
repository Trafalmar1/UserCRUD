const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator/check");

router.get("/user", isAuth, userController.getUsers);
router.get("/user/:id", isAuth, userController.getOneUser);
router.put(
  "/user",
  isAuth,
  [
    body("username").trim().notEmpty(),
    body("email").trim().isEmail(),
    body("role").notEmpty().isIn(["admin", "user"]),
  ],
  userController.updateUser
);
router.delete("/user/:id", isAuth, userController.deleteUser);
router.get("/dashboard", isAuth, userController.dashboard);

module.exports = router;
