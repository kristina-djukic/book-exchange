const bcrypt = require('bcrypt');
const saltRounds = 10;


async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, saltRounds);
}

module.exports = hashPassword;