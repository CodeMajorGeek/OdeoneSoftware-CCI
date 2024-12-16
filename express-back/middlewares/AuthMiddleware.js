const dotenv = require("dotenv")
dotenv.config()

const TOKEN_SECRET = process.env.TOKEN_SECRET

const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null)
        return res.sendStatus(401)

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.error(err)

        if (err)
            return res.sendStatus(403)

        req.user = user
        next()
    })
}

module.exports = {
    authenticateToken
}