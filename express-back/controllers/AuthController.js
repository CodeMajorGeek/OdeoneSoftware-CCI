const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userService = require("../services/UserService")
const sessionService = require("../services/SessionService")

const TOKEN_SECRET = process.env.TOKEN_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

async function authenticate(req, res) {
    const { email, pass } = req.body;
    const user = await userService.findUserByEmail(email)

    const passVerified = await bcrypt.compare(pass, user.password)

    if (passVerified) {
        const accessToken = jwt.sign({ email: email }, TOKEN_SECRET, { expiresIn: "1h" })
        const refreshToken = jwt.sign({ email: email }, REFRESH_SECRET, { expiresIn: "1d" })

        await sessionService.saveRefreshToken(user, refreshToken)

        res.status(200).json({ accessToken, refreshToken })
    } else
        res.status(401).json({ message: "Unauthorized" })
}

async function refresh(req, res) {
    try {
        const { email } = req.refreshPayload
        const user = userService.findUserByEmail(email)
        const accessToken = jwt.sign({ email: email })
        const refreshToken = jwt.sign({ email: email }, REFRESH_SECRET, { expiresIn: "1d"})

        await sessionService.saveRefreshToken(user, refreshToken)
        res.status(200).json({ accessToken, refreshToken })
    } catch (error) {
        res.status(401).json({ message: "Unable to refresh the token", error })
    }
}

function logout(req, res) {

}

function forgot(req, res) {

}

function forgotConfirm(req, res) {

}

module.exports = {
    authenticate,
    refresh,
    logout,
    forgot,
    forgotConfirm
}