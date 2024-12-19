const roleRepository = require("../repositories/RoleRepository")

async function findRoleByUser(user) {
    return await roleRepository.getRoleByUser(user)
}

module.exports = {
    findRoleByUser
}