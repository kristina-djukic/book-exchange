const checkPassword = require("../functions/checkPassword");

const {
  createUser,
  userCheckEmail,
  userCheckUsername,
  getLocationByCityPostcode,
  createLocation,
  getUserByEmail,
} = require("../repositories/auth.repository");

const register = async (
  username,
  name,
  surname,
  email,
  password,
  city,
  postcode
) => {
  const emailExists = await userCheckEmail(email);
  if (emailExists) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }
  const usernameExists = await userCheckUsername(username);
  if (usernameExists) {
    throw new Error("USERNAME_ALREADY_EXISTS");
  }

  let loc = await getLocationByCityPostcode(city, postcode);
  let locationId;
  if (loc) {
    locationId = loc.id;
  } else {
    locationId = await createLocation(city, postcode);
  }

  createUser(username, name, surname, email, password, locationId);
};

const login = async (email, password) => {
  const user = await getUserByEmail(email);
  if (await checkPassword(password, user.password)) {
    return user;
  } else {
    throw new Error("INVALID_CREDENTIALS");
  }
};

module.exports = {
  register,
  login,
};
