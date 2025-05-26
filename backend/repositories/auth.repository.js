const db = require("../config/db");
const hashPassword = require("../functions/hashPassword");

const registerQuery = `
      INSERT INTO user
        (username, name, surname, email, password)
      VALUES (?, ?, ?, ?, ?)
    `;

const userEmailQuery = `
  SELECT id, username, name, surname, email, password
  FROM user
  WHERE email = ?
`;

const createUser = async (username, name, surname, email, password) => {
  db.query(registerQuery, [
    username,
    name,
    surname,
    email,
    await hashPassword(password),
  ]);
};

const getUserByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    db.query(userEmailQuery, [email], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return resolve(null);
      }
      resolve(result[0]);
    });
  });
};

const userCheckUsername = async (username) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT 1 FROM user WHERE username = ?`;
    db.query(query, [username], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.length > 0);
    });
  });
};

const userCheckEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT 1 FROM user WHERE email = ?`;
    db.query(query, [email], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.length > 0);
    });
  });
};
module.exports = {
  createUser,
  userCheckEmail,
  userCheckUsername,
  getUserByEmail,
};
