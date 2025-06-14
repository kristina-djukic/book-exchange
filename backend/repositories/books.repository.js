const db = require("../config/db");

const createBookQuery = `
  INSERT INTO Books (title, author, description, availability_time, user_id, image)
  VALUES (?, ?, ?, ?, ?, ?)`;

const getBooksByUserIdQuery = `SELECT * FROM Books WHERE user_id = ?`;

const updateBookQuery = `
  UPDATE Books
  SET title = ?, author = ?, description = ?, availability_time = ?, image = ?
  WHERE id = ?`;

const updateAvailabilityQuery = `
  UPDATE Books
  SET available = NOT available
  WHERE id = ?
`;

const deleteBookQuery = `DELETE FROM Books WHERE id = ?`;

const createBook = (
  title,
  author,
  description,
  availability_time,
  user_id,
  image
) => {
  return new Promise((resolve, reject) => {
    db.query(
      createBookQuery,
      [title, author, description, availability_time, user_id, image],
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

const updateBook = (
  id,
  title,
  author,
  description,
  availability_time,
  image
) => {
  return new Promise((resolve, reject) => {
    db.query(
      updateBookQuery,
      [title, author, description, availability_time, image, id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      }
    );
  });
};

const updateAvailability = (id) => {
  return new Promise((resolve, reject) => {
    db.query(updateAvailabilityQuery, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results.affectedRows > 0);
    });
  });
};

const deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    db.query(deleteBookQuery, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results.affectedRows > 0);
    });
  });
};

module.exports = {
  createBook,
  getBooksByUserId,
  updateBook,
  updateAvailability,
  deleteBook,
};
