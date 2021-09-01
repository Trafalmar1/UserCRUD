const User = require("../Models/User");
const bcrypt = require("bcryptjs");

class UserController {
  getUsers(req, res) {
    User.findAll({ attributes: ["id", "username", "email", "role"] })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log({ error: { message: err.message } });
      });
  }

  getOneUser(req, res) {
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
        res.json({ error: { message: err.message } });
      });
  }

  updateUser(req, res) {
    const { id, username, email, password, role } = req.body;

    User.update({ username, email, password, role }, { where: { id: id } })
      .then((result) => {
        if (!result) {
          throw new Error("User not found");
        }
        res.status(200).json("User successfully updated");
      })
      .catch((err) => {
        res.json({ error: { message: err.message } });
      });
  }

  deleteUser(req, res) {
    const id = req.params.id;
    User.destroy({ where: { id: id } })
      .then((result) => {
        if (!result) {
          throw new Error("User not found");
        }
        res.status(200).json("User was successfully deleted");
      })
      .catch((err) => {
        res.json({ error: { message: err.message } });
      });
  }
}

module.exports = new UserController();
