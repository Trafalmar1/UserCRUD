const { validationResult } = require("express-validator/check");
const Profile = require("../Models/Profile");
const User = require("../Models/User");

class ProfileController {
  getProfiles(req, res, next) {
    Profile.findAll()
      .then((profiles) => {
        if (!profiles) {
          const error = new Error("Profiles not found");
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json(profiles);
      })
      .catch((err) => {
        next(err);
      });
  }

  getOneProfile(req, res, next) {
    const id = req.params.id;
    Profile.findOne({ where: { id: id } })
      .then((profile) => {
        if (!profile) {
          const error = new Error("Profile not found");
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json(profile);
      })
      .catch((err) => {
        next(err);
      });
  }

  createProfile(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Validation failed", errors: errors.array() });
    }
    const { name, city, birthday, gender } = req.body;
    User.findOne({ where: { id: req.userId } })
      .then((user) => {
        if (!user) {
          const error = new Error("User does not exist");
          error.statusCode = 404;
          throw error;
        }
        user
          .createProfile({ name, city, birthday, city, gender })
          .then((profile) => {
            res.status(200).json(profile);
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }

  updateProfile(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Validation failed", errors: errors.array() });
    }
    const { name, city, birthday, gender, id } = req.body;
    Profile.findOne({ where: { id: id } })
      .then((profile) => {
        if (!profile) {
          const error = new Error("Profile not found");
          error.statusCode = 404;
          throw error;
        }

        if (profile.userId !== req.userId && req.userRole === "user") {
          const error = new Error("Access denied");
          throw error;
        }
        Profile.update({ name, city, birthday, gender }, { where: { id: id } })
          .then((profile) => {
            res.status(200).json(profile);
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }

  deleteProfile(req, res, next) {
    const id = req.params.id;
    Profile.findOne({ where: { id: id } })
      .then((profile) => {
        if (!profile) {
          const error = new Error("Profile not found");
          error.statusCode = 404;
          throw error;
        }
        if (profile.userId !== req.userId && req.userRole === "user") {
          const error = new Error("Access denied");
          throw error;
        }
        Profile.destroy({ where: { id: id } })
          .then(() => {
            res.status(200).json("Profile was successfully deleted");
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }
}

module.exports = new ProfileController();
