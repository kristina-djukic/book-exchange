const db = require("../config/db");

const createBookQuery = `
  INSERT INTO books (title, author, description, language, availability_time, user_id, image, available)
  VALUES (?, ?, ?, ?, ?, ?, ?, 1)`;

const getBooksByUserIdQuery = `SELECT * FROM books WHERE user_id = ?`;

const updateBookQuery = `
  UPDATE books
  SET title = ?, author = ?, description = ?, language = ?, availability_time = ?, image = ?
  WHERE id = ?`;

const updateAvailabilityQuery = `
  UPDATE books
  SET available = NOT available
  WHERE id = ?
`;

const deleteBookQuery = `DELETE FROM books WHERE id = ?`;

const getBooksByCityQuery = `
  SELECT
    b.*,
    u.username,
    u.picture AS userPicture,
    u.contact_email,
    u.contact_phone,
    u.address,
    u.email,
    u.phone,
    l.city,
    l.postcode,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as review_count
  FROM books b
  JOIN users u ON b.user_id = u.id
  JOIN locations l ON u.location_id = l.id
  LEFT JOIN reviews r ON b.id = r.book_id
  WHERE l.city = ? AND b.available = 1
  GROUP BY b.id, u.username, u.picture, u.contact_email, u.contact_phone, 
           u.address, u.email, u.phone, l.city, l.postcode
  ORDER BY b.date_posted DESC
  LIMIT 12
`;

const getBooksByRatingQuery = `
  SELECT
    b.*,
    u.username,
    u.picture AS userPicture,
    u.contact_email,
    u.contact_phone,
    u.address,
    u.email,
    u.phone,
    l.city,
    l.postcode,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as review_count
  FROM books b
  JOIN users u ON b.user_id = u.id
  JOIN locations l ON u.location_id = l.id
  LEFT JOIN reviews r ON b.id = r.book_id
  WHERE l.city = ? AND b.available = 1
  GROUP BY b.id, u.username, u.picture, u.contact_email, u.contact_phone, 
           u.address, u.email, u.phone, l.city, l.postcode
  HAVING average_rating > 0
  ORDER BY average_rating DESC, review_count DESC
  LIMIT 12
`;

const searchBooksQuery = `
  SELECT
    b.*,
    u.username,
    u.picture AS userPicture,
    u.contact_email,
    u.contact_phone,
    u.address,
    u.email,
    u.phone,
    l.city,
    l.postcode,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as review_count
  FROM books b
  JOIN users u ON b.user_id = u.id
  JOIN locations l ON u.location_id = l.id
  LEFT JOIN reviews r ON b.id = r.book_id
  WHERE (b.title LIKE ? OR b.author LIKE ?)
  GROUP BY b.id, u.username, u.picture, u.contact_email, u.contact_phone, 
           u.address, u.email, u.phone, l.city, l.postcode
  ORDER BY b.date_posted DESC
`;

const getBookReviewsQuery = `
  SELECT 
    r.*,
    u.username,
    u.picture as userPicture
  FROM reviews r
  JOIN users u ON r.user_id = u.id
  WHERE r.book_id = ?
  ORDER BY r.date_posted DESC
`;

const addReviewQuery = `
  INSERT INTO reviews (book_id, user_id, rating, comment)
  VALUES (?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    rating = VALUES(rating),
    comment = VALUES(comment),
    date_posted = CURRENT_TIMESTAMP
`;

const deleteReviewQuery = `
  DELETE FROM reviews 
  WHERE book_id = ? AND user_id = ?
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

const getBooksByRating = (city) =>
  new Promise((resolve, reject) => {
    db.query(getBooksByRatingQuery, [city], (err, rows) => {
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

const getBookReviews = (bookId) => {
  return new Promise((resolve, reject) => {
    db.query(getBookReviewsQuery, [bookId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const addOrUpdateReview = (bookId, userId, rating, comment) => {
  return new Promise((resolve, reject) => {
    db.query(
      addReviewQuery,
      [bookId, userId, rating, comment],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, bookId, userId, rating, comment });
      }
    );
  });
};

const deleteReview = (bookId, userId) => {
  return new Promise((resolve, reject) => {
    db.query(deleteReviewQuery, [bookId, userId], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

module.exports = {
  createBook,
  getBooksByUserId,
  updateBook,
  updateAvailability,
  deleteBook,
  getBooksByCity,
  getBooksByRating,
  searchBooks,
  getBookReviews,
  addOrUpdateReview,
  deleteReview,
};
