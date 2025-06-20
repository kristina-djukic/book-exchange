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
    u.contact_email AS contactEmail,
    u.contact_phone AS contactPhone,
    u.picture
  FROM user u
  LEFT JOIN locations l
    ON u.location_id = l.id
  WHERE u.id = ?
`;

const updateProfileQuery = `
  UPDATE user
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

const getProfileById = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(getProfileByIdQuery, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
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
  contactEmail,
  contactPhone,
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
        contactEmail,
        contactPhone,
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

module.exports = {
  getProfileById,
  updateProfile,
};
