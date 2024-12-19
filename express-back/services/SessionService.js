const sessionRepository = require("../repositories/SessionRepository")

async function saveRefreshToken(user, refreshToken) {
    return await sessionRepository.createRefreshToken(user, refreshToken)
}

async function findRefreshByUser(user) {
    return await sessionRepository.getRefreshByUser(user)
}

async function removeRefresh(refresh) {
    return await sessionRepository.deleteRefresh(refresh)
}

module.exports = {
    saveRefreshToken,
    findRefreshByUser,
    removeRefresh
}