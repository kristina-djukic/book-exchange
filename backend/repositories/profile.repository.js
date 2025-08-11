const db = require("../config/db");

const getProfileByIdQuery = `
  SELECT
    u.id,
    u.username,
    u.name,
    u.surname,
    l.city,
    l.postcode,
    u.address,
    u.phone,
    u.contact_email,
    u.contact_phone,
    u.picture
  FROM users u
  LEFT JOIN locations l
    ON u.location_id = l.id
  WHERE u.id = ?
`;

const updateProfileQuery = `
  UPDATE users
  SET
    name          = ?,
    surname       = ?,
    location_id   = ?,
    address       = ?,
    phone         = ?,
    contact_email = ?,
    contact_phone = ?,
    picture = ?
  WHERE id = ?
`;

const getLocationByCityPostcodeQuery = `
  SELECT id
  FROM locations
  WHERE city = ? AND postcode = ?
`;

const createLocationQuery = `
  INSERT INTO locations (city, postcode)
  VALUES (?, ?)
`;

const getUserReviewsQuery = `
  SELECT 
    r.*,
    b.title as bookTitle,
    b.author as bookAuthor,
    b.image as bookImage
  FROM reviews r
  JOIN books b ON r.book_id = b.id
  WHERE r.user_id = ?
  ORDER BY r.date_posted DESC
`;

const getProfileById = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(getProfileByIdQuery, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

const getLocationByCityPostcode = (city, postcode) => {
  return new Promise((resolve, reject) => {
    db.query(
      getLocationByCityPostcodeQuery,
      [city, postcode],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0] || null);
      }
    );
  });
};

const createLocation = (city, postcode) => {
  return new Promise((resolve, reject) => {
    db.query(createLocationQuery, [city, postcode], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

const updateProfile = (
  userId,
  name,
  surname,
  locationId,
  address,
  phone,
  contact_email,
  contact_phone,
  picture
) => {
  return new Promise((resolve, reject) => {
    db.query(
      updateProfileQuery,
      [
        name,
        surname,
        locationId,
        address,
        phone,
        contact_email,
        contact_phone,
        picture,
        userId,
      ],
      (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      }
    );
  });
};

const getUserReviews = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(getUserReviewsQuery, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getProfileById,
  updateProfile,
  getLocationByCityPostcode,
  createLocation,
  getUserReviews,
};
