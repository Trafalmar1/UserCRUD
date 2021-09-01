const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");

class AuthController {
  signUp(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Validation failed", errors: errors.array() });
    }
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
              next(err);
            });
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  signIn(req, res, next) {
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
            const token = jwt.sign(
              { email: email, id: user.id },
              process.env.SECRET,
              { expiresIn: "30 days" }
            );
            res.status(200).json({ token: token, userId: user.id });
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = new AuthController();
