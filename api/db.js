const { Sequelize } = require("sequelize");

const config = {
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
};

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "postgres",
});

module.exports = { sequelize, Sequelize };
