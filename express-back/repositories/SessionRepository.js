const dbSession = require("./Database").Sessions

async function createRefreshToken(user, refreshToken) {
    return await dbSession.create({ id_user: user.id_user, refresh: refreshToken })
}

async function getRefreshByUser(user) {
    return await dbSession.findOne({ where: { id_user: user.id_user }})
}

async function deleteRefreshByUser(user) {
    return await dbSession.destroy({ where: { id_user: user.id_user }})
}

async function deleteSessionByUserId(userId) {
    return await dbSession.destroy({ where: { id_user: userId }})
}

module.exports = {
    createRefreshToken,
    getRefreshByUser,
    deleteRefreshByUser,
    deleteSessionByUserId
}