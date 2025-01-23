const dbUser = require("./Database").Users

async function getAllUsers() {
    return await dbUser.findAll()
}

async function getUserById(id) {
    return await dbUser.findOne({ where: { id_user: id }})
}

async function getUserByCompany(companyName) {
    return await dbUser.findOne({ where: { company: companyName }})
}

async function getUserByEmail(email) {
    return await dbUser.findOne({ where: { main_email: email }})
}

async function addUser(user) {
    return await dbUser.create({ ...user })
}

async function updateUser(id, user) {
    return await dbUser.update(user, { where: { id_user: id }})
}

async function updateUserByEmail(email, user) {
    return await dbUser.update(user, { where: { main_email: email }})
}

async function deleteUser(id) {
    return await dbUser.destroy({ where: { id_user: id }})
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByCompany,
    getUserByEmail,
    addUser,
    updateUser,
    updateUserByEmail,
    deleteUser
}