const jwt = require("jsonwebtoken")

const userService = require("../services/UserService")
const sessionService = require("../services/SessionService")

const TOKEN_SECRET = process.env.TOKEN_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

const authenticateTokenMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, TOKEN_SECRET)

        req.auth = {
            email: decodedToken.email
        }

        next()
    } catch (error) {
        res.status(401).json({ error })
    }
}

const refreshTokenMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, REFRESH_SECRET)
        const user = userService.findUserByEmail(decodedToken.email)

        const { refresh } = await sessionService.findRefreshByUser(user)
        console.log(refresh)

        if (token != refresh)
                throw "Unvalid token !"

        req.refreshPayload = { email: decodedToken.email }
        next()
    } catch (error) {
        res.status(401).json({ error })
    }
}

module.exports = {
    authenticateTokenMiddleware,
    refreshTokenMiddleware
}