const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getOneUser);
router.post("/user", userController.createUser);
router.put("/user", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
