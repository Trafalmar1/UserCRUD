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
    const { id, username, email, password, role } = req.body;

    User.update({ username, email, password, role }, { where: { id: id } })
      .then((result) => {
        if (!result) {
          throw new Error("User not found");
        }
        res.status(200).json("User successfully updated");
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
