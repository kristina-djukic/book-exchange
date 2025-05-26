const {
  createUser,
  loginUser,
  userCheckEmail,
  userCheckUsername,
} = require("../repositories/auth.repository");

const register = async (username, name, surname, email, password) => {
  const emailExists = await userCheckEmail(email);
  if (emailExists) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }
  const usernameExists = await userCheckUsername(username);
  if (usernameExists) {
    throw new Error("USERNAME_ALREADY_EXISTS");
  }

  createUser(username, name, surname, email, password);
};

const login = async (email, password) => {
  loginUser(email, password);
};

module.exports = {
  register,
  login,
};
