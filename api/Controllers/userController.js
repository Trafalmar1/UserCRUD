const { validationResult } = require("express-validator/check");
const User = require("../Models/User");
const Profile = require("../Models/Profile");

class UserController {
  getUsers(req, res, next) {
    User.findAll({
      attributes: ["id", "username", "email", "role"],
      include: [
        {
          model: Profile,
          attributes: ["id"],
        },
      ],
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  }

  getOneUser(req, res, next) {
    const id = req.params.id;
    User.findOne({ where: { id: id } })
      .then((result) => {
        if (!result) {
          const error = new Error("User not found");
          throw error;
        }
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  }

  updateUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Validation failed", errors: errors.array() });
    }
    const { id, email } = req.body;
    User.findOne({ where: { email: email } })
      .then((user) => {
        if (user && user.id !== id) {
          throw new Error(`User with ${email} email already exists`);
        }
        User.update({ ...req.body }, { where: { id: id } })
          .then((result) => {
            if (!result) {
              throw new Error("User not found");
            }
            res.status(200).json("User successfully updated");
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  }

  deleteUser(req, res, next) {
    const id = req.params.id;
    User.destroy({ where: { id: id } })
      .then((result) => {
        if (!result) {
          throw new Error("User not found");
        }
        res.status(200).json("User was successfully deleted");
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = new UserController();
