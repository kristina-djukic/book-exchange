const db = require("../config/db");

const createBookQuery = `
  INSERT INTO Books (title, author, description, availability_time, user_id)
  VALUES (?, ?, ?, ?, ?)`;

const getBooksByUserIdQuery = `SELECT * FROM Books WHERE user_id = ?`;

const updateBookQuery = `
  UPDATE Books
  SET title = ?, author = ?, description = ?, availability_time = ?
  WHERE id = ?`;

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

const updateBook = (id, title, author, description, availability_time) => {
  return new Promise((resolve, reject) => {
    db.query(
      updateBookQuery,
      [title, author, description, availability_time, id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      }
    );
  });
};

module.exports = {
  createBook,
  getBooksByUserId,
  updateBook,
};
