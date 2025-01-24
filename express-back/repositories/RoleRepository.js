const dbRole = require("./Database").Roles

async function getRoleByUser(user) {
    return await dbRole.findOne({ where: { id_role: user.id_role }})
}

async function findRoleById(id) {
    return await dbRole.findByPk(id)
}

module.exports = {
    getRoleByUser,
    findRoleById
}