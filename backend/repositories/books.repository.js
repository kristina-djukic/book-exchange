const db = require("../config/db");

const createBookQuery = `
  INSERT INTO Books (title, author, description, language, availability_time, user_id, image, available)
  VALUES (?, ?, ?, ?, ?, ?, ?, 1)`;

const getBooksByUserIdQuery = `SELECT * FROM Books WHERE user_id = ?`;

const updateBookQuery = `
  UPDATE Books
  SET title = ?, author = ?, description = ?, language = ?, availability_time = ?, image = ?
  WHERE id = ?`;

const updateAvailabilityQuery = `
  UPDATE Books
  SET available = NOT available
  WHERE id = ?
`;

const deleteBookQuery = `DELETE FROM Books WHERE id = ?`;

const getBooksByCityQuery = `
  SELECT
    b.*,
    u.username,
    u.picture    AS userPicture,
    u.contact_email,
    u.contact_phone,
    u.contact_email AS contactEmail,
    u.contact_phone AS contactPhone,
    u.address,
    u.email,
    u.phone,
    l.city,
    l.postcode
  FROM Books b
  JOIN user u ON b.user_id = u.id
  JOIN locations l ON u.location_id = l.id
  WHERE l.city = ?
    AND b.available = 1
`;

const searchBooksQuery = `
  SELECT
    b.*,
    u.username,
    u.picture    AS userPicture,
    u.contact_email,
    u.contact_phone,
    u.contact_email AS contactEmail,
    u.contact_phone AS contactPhone,
    u.address,
    u.email,
    u.phone,
    l.city,
    l.postcode
  FROM Books b
  JOIN user u ON b.user_id = u.id
  JOIN locations l ON u.location_id = l.id
  WHERE b.available = 1
    AND (b.title LIKE ? OR b.author LIKE ?)
`;

const createBook = (
  title,
  author,
  description,
  language,
  availability_time,
  user_id,
  image
) => {
  return new Promise((resolve, reject) => {
    db.query(
      createBookQuery,
      [title, author, description, language, availability_time, user_id, image],
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
  language,
  availability_time,
  image
) => {
  return new Promise((resolve, reject) => {
    db.query(
      updateBookQuery,
      [title, author, description, language, availability_time, image, id],
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

const getBooksByCity = (city) =>
  new Promise((resolve, reject) => {
    db.query(getBooksByCityQuery, [city], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

const searchBooks = (searchTerm) => {
  return new Promise((resolve, reject) => {
    const searchPattern = `%${searchTerm}%`;
    db.query(
      searchBooksQuery,
      [searchPattern, searchPattern],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

module.exports = {
  createBook,
  getBooksByUserId,
  updateBook,
  updateAvailability,
  deleteBook,
  getBooksByCity,
  searchBooks,
};
