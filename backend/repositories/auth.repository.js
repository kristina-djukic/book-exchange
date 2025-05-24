const db = require("../config/db");

const registerQuery = `
      INSERT INTO user
        (username, name, surname, email, password)
      VALUES (?, ?, ?, ?, ?)
    `;

const loginQuery = `
      SELECT * FROM user
      WHERE email = ? AND password = ? 
    `;

const createUser = async (username, name, surname, email, password) => {
    db.query(registerQuery, [username, name, surname, email, password], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
    });
  }
const loginUser = async (email, password) => {
    db.query(loginQuery, [email, password], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0) return res.status(401).json({ error: "Invalid credentials" });
      res.json({ user: result[0] });
    });
  }
  
  module.exports = {
    createUser,
    loginUser
  };