const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const authService = require("../services/AuthService")
const userService = require("../services/UserService")

const TOKEN_SECRET = process.env.TOKEN_SECRET

async function authenticate(req, res) {
    const { email, pass } = req.body;
    const user = await userService.findUserByEmail(email)

    const passVerified = await bcrypt.compare(pass, user.password)

    if (passVerified) {
        const token = jwt.sign({ email: email }, TOKEN_SECRET, { expiresIn: "1h" })
        res.status(200).json(token)
    } else
        res.status(401).json({ message: "Unauthorized" })
}

function refresh(req, res) {

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