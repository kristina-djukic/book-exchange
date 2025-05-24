const { createUser, loginUser } = require("../repositories/auth.repository")

const register = async (username, name, surname, email, password) => {
    createUser(username, name, surname, email, password)
}

const login = async ( email, password) => {
    loginUser(email, password)
}

module.exports = {
    register,
    login
}