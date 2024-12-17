const sessionRepository = require("../repositories/SessionRepository")

async function saveRefreshToken(user, refreshToken) {
    return await sessionRepository.createRefreshToken(user, refreshToken)
}

async function findRefreshByUser(user) {
    return await sessionRepository.getRefreshByUser(user)
}

module.exports = {
    saveRefreshToken,
    findRefreshByUser
}