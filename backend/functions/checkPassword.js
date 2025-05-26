const bcrypt = require("bcrypt");

async function checkPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = checkPassword;
