const userRepository = require("../repositories/UserRepository")

async function findAllUsers() {
    return await userRepository.getAllFunctions()
}

async function findUserById(id) {
    return await userRepository.getUserById(id)
}

async function findUserByCompany(company) {
    return await userRepository.getUserByCompany(company)
}

async function findUserByEmail(email) {
    return await userRepository.findUserByEmail(email)
}

async function createUser(user) {
    return await userRepository.addUser(user)
}

async function editUser(id, user) {
    return await userRepository.updateUser(id, user)
}

async function removeUser(id) {
    return await userRepository.deleteUser(id)
}

module.exports = {
    findAllUsers,
    findUserById,
    findUserByCompany,
    findUserByEmail,
    createUser,
    editUser,
    removeUser
}