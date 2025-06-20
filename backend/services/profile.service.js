const repo = require("../repositories/profile.repository");

const getProfileById = async (id) => {
  return await repo.getProfileById(id);
};

const updateProfile = async (
  userId,
  name,
  surname,
  city,
  postcode,
  address,
  phone,
  contact_email,
  contact_phone,
  picture
) => {
  let location = await repo.getLocationByCityPostcode(city, postcode);
  if (!location) {
    const newLocationId = await repo.createLocation(city, postcode);
    location = { id: newLocationId };
  }

  return await repo.updateProfile(
    userId,
    name,
    surname,
    location.id,
    address,
    phone,
    contact_email ? 1 : 0,
    contact_phone ? 1 : 0,
    picture
  );
};

module.exports = {
  getProfileById,
  updateProfile,
};
