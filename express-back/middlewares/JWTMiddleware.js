const jwt = require("jsonwebtoken")

const TOKEN_SECRET = process.env.TOKEN_SECRET

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

module.exports = {
    authenticateTokenMiddleware
}