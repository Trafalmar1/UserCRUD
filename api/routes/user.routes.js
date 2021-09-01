const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const isAuth = require("../middleware/is-auth");

router.get("/user", isAuth, userController.getUsers);
router.get("/user/:id", isAuth, userController.getOneUser);
router.put("/user", isAuth, userController.updateUser);
router.delete("/user/:id", isAuth, userController.deleteUser);

module.exports = router;
