const express = require("express");

const app = express();
const port = 3000;

const usersRouter = require("./routes/user.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.use("/api", usersRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
