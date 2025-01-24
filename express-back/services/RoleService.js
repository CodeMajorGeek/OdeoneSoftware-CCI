const roleRepository = require("../repositories/RoleRepository")

async function findRoleByUser(user) {
    return await roleRepository.getRoleByUser(user)
}

async function findRoleById(id) {
    return await roleRepository.findRoleById(id)
}

module.exports = {
    findRoleByUser,
    findRoleById
}