const express = require("express");
const router = express.Router();
const profileController = require("../Controllers/profileController");
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator/check");

router.get("/profile", isAuth, profileController.getProfiles);
router.get("/profile/:id", isAuth, profileController.getOneProfile);
router.post(
  "/profile",
  isAuth,
  [
    body("birthday").trim().isISO8601().notEmpty(),
    body("gender").trim().notEmpty().isIn(["male", "female"]),
    body("name").trim().notEmpty(),
    body("city").trim().notEmpty(),
  ],
  profileController.createProfile
);
router.put(
  "/profile",
  isAuth,
  [
    body("birthday").trim().isISO8601().notEmpty(),
    body("gender").trim().notEmpty().isIn(["male", "female"]),
    body("name").trim().notEmpty(),
    body("city").trim().notEmpty(),
  ],
  profileController.updateProfile
);
router.delete("/profile/:id", isAuth, profileController.deleteProfile);

module.exports = router;
