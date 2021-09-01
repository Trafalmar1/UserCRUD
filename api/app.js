const express = require("express");
const { sequelize } = require("./db");

const app = express();
const port = 8080;
const cors = require("cors");

const usersRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", usersRouter);
app.use("/api", authRouter);

// error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.json({ error: { ...err, message: err.message } });
});

sequelize
  .sync()
  .then((res) => {
    console.log(res);
    app.listen(port, () => {
      console.log(`App running on port ${port}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
