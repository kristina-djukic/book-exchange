const db = require("../config/db");
const hashPassword = require("../functions/hashPassword");

const registerQuery = `
  INSERT INTO users
    (username, name, surname, email, password, location_id)
  VALUES (?, ?, ?, ?, ?, ?)
`;
const userEmailQuery = `
  SELECT id, username, name, surname, email, password
  FROM users
  WHERE email = ?
`;

const locationSelectQuery = `
  SELECT id, city, postcode
  FROM locations
  WHERE city = ? AND postcode = ?
`;
const locationInsertQuery = `
  INSERT INTO locations (city, postcode)
  VALUES (?, ?)
`;

const createUser = async (
  username,
  name,
  surname,
  email,
  password,
  locationId
) => {
  const hashed = await hashPassword(password);
  return new Promise((resolve, reject) => {
    db.query(
      registerQuery,
      [username, name, surname, email, hashed, locationId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
};

const getUserByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    db.query(userEmailQuery, [email], (err, result) => {
      if (err) return reject(err);
      if (result.length === 0) return resolve(null);
      resolve(result[0]);
    });
  });
};

const userCheckUsername = async (username) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT 1 FROM user WHERE username = ?",
      [username],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.length > 0);
      }
    );
  });
};

const userCheckEmail = async (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT 1 FROM user WHERE email = ?", [email], (err, result) => {
      if (err) return reject(err);
      resolve(result.length > 0);
    });
  });
};

const getLocationByCityPostcode = async (city, postcode) => {
  return new Promise((resolve, reject) => {
    db.query(locationSelectQuery, [city, postcode], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

const createLocation = async (city, postcode) => {
  return new Promise((resolve, reject) => {
    db.query(locationInsertQuery, [city, postcode], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

module.exports = {
  createUser,
  getUserByEmail,
  userCheckUsername,
  userCheckEmail,
  getLocationByCityPostcode,
  createLocation,
};
