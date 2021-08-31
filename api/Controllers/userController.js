const db = require("../db");

class User {
  async getUsers(req, res) {
    const users = await db.query("SELECT * FROM users");
    res.json(users.rows);
  }

  async getOneUser(req, res) {
    const id = req.params.id;
    const user = await db.query("SELECT * FROM users WHERE id=$1", [id]);
    res.json(user.rows[0]);
  }

  async createUser(req, res) {
    const { username, password, email, role } = req.body;
    const duplicate = await db.query("SELECT email FROM users WHERE email=$1", [
      email,
    ]);
    if (duplicate.rows.length > 0) {
      res.json(`User with ${email} email already exists`);
      return;
    }
    const newPerson = await db.query(
      "INSERT INTO users (username,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *",
      [username, email, password, role]
    );
    res.status(201).json(newPerson.rows[0]);
  }

  async updateUser(req, res) {
    const { id, username, email, password, role } = req.body;
    const user = await db.query(
      "UPDATE users set username=$1, email=$2, password=$3, role=$4 WHERE id=$5 RETURNING *",
      [username, email, password, role, id]
    );
    res.json(user.rows[0]);
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    const user = await db.query("DELETE FROM users WHERE id=$1 RETURNING *", [
      id,
    ]);
    res.json(user.rows[0]);
  }
}

module.exports = new User();
