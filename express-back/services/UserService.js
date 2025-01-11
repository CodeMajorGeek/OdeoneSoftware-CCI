const userRepository = require("../repositories/UserRepository")

async function findAllUsers() {
    return await userRepository.getAllFunctions()
}

async function findUserById(id) {
    return await userRepository.getUserById(id)
}

async function findUserByVerifyId(verifyId) {
    return await userRepository.getUserByVerifyId(verifyId)
}

async function updateVerifyId(user, verifyId) {
    return await userRepository.updateUserVerifyId(user, verifyId)
}

async function findUserByCompany(company) {
    return await userRepository.getUserByCompany(company)
}

async function findUserByEmail(email) {
    return await userRepository.getUserByEmail(email)
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
    findUserByVerifyId,
    updateVerifyId,
    findUserByCompany,
    findUserByEmail,
    createUser,
    editUser,
    removeUser
}