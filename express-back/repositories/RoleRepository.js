const dbRole = require("./Database").Roles

async function getRoleByUser(user) {
    return await dbRole.findOne({ where: { id_role: user.id_role }})
}

module.exports = {
    getRoleByUser
}