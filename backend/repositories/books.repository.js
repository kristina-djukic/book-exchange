const db = require("../config/db");

const createBookQuery = `
  INSERT INTO Books (title, author, description, availability_time, user_id)
  VALUES (?, ?, ?, ?, ?)`;

const getBooksByUserIdQuery = `SELECT * FROM Books WHERE user_id = ?`;

const createBook = (title, author, description, availability_time, user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      createBookQuery,
      [title, author, description, availability_time, user_id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      }
    );
  });
};

const getBooksByUserId = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(getBooksByUserIdQuery, [user_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  createBook,
  getBooksByUserId,
};
