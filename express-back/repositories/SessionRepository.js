const dbSession = require("./Database").Sessions

async function createRefreshToken(user, refreshToken) {
    return await dbSession.create({ id_user: user.id_user, refresh: refreshToken })
}

async function getRefreshByUser(user) {
    return await dbSession.findOne({ where: { id_user: user.id_user }})
}

async function deleteRefresh(refreshToken) {
    return await dbSession.destroy({ where: { refresh: refreshToken }})
}

module.exports = {
    createRefreshToken,
    getRefreshByUser,
    deleteRefresh
}