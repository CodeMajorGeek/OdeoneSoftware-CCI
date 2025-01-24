const sessionRepository = require("../repositories/SessionRepository")

async function saveRefreshToken(user, refreshToken) {
    return await sessionRepository.createRefreshToken(user, refreshToken)
}

async function findRefreshByUser(user) {
    return await sessionRepository.getRefreshByUser(user)
}

async function removeRefreshByUser(user) {
    return await sessionRepository.deleteRefreshByUser(user)
}

async function removeSessionByUserId(userId) {
    return await sessionRepository.deleteSessionByUserId(userId)
}

module.exports = {
    saveRefreshToken,
    findRefreshByUser,
    removeRefreshByUser,
    removeSessionByUserId
}