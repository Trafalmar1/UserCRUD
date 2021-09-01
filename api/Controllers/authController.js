const User = require("../Models/User");
const bcrypt = require("bcryptjs");

class AuthController {
  signUp(req, res) {
    const { username, password, email, role } = req.body;
    User.findOne({ where: { email: email } })
      .then((result) => {
        if (!result) return result;
        throw new Error(`User with ${email} email already exists`);
      })
      .then(() => {
        bcrypt.hash(password, 12).then((hashedPassword) => {
          User.create({ username, email, password: hashedPassword, role })
            .then((result) => {
              res.status(201).json(result);
            })
            .catch((err) => {
              res.json({ error: { message: err.message } });
            });
        });
      })
      .catch((err) => {
        res.json({ error: { message: err.message } });
      });
  }

  signIn(req, res) {
    const { email, password } = req.body;
    User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          throw new Error("User does not exist");
        }
        bcrypt
          .compare(password, user.password)
          .then((doMatch) => {
            if (!doMatch) {
              throw new Error("Password do not match");
            }
            res.json("User successfully logged in");
          })
          .catch((err) => {
            res.json({ error: { message: err.message } });
          });
      })
      .catch((err) => {
        res.json({ error: { message: err.message } });
      });
  }
}

module.exports = new AuthController();
