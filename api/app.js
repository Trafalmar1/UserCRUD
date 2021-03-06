require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const { sequelize } = require("./db");

const usersRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const profileRouter = require("./routes/profile.routes");

const User = require("./Models/User");
const Profile = require("./Models/Profile");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", authRouter);
app.use("/api", usersRouter);
app.use("/api", profileRouter);

// error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.json({ error: { ...err, message: err.message } });
});

Profile.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Profile);

sequelize
  .sync()
  .then((res) => {
    console.log(res);
    app.listen(process.env.PORT || port, () => {
      console.log(`App running on port ${port}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
