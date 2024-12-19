const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userService = require("../services/UserService")
const roleService = require("../services/RoleService")
const sessionService = require("../services/SessionService")

const TOKEN_SECRET = process.env.TOKEN_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

async function authenticate(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email)
        const role = await roleService.findRoleByUser(user)

        const passVerified = await bcrypt.compare(password, user.password)
        if (passVerified) {
            const jwtData = {
                email: email,
                admin: role.weight === 666
            }

            const accessToken = jwt.sign(jwtData, TOKEN_SECRET, { expiresIn: "1h" })
            const refreshToken = jwt.sign(jwtData, REFRESH_SECRET, { expiresIn: "1d" })

            await sessionService.saveRefreshToken(user, refreshToken)

            res.status(200).json({ accessToken, refreshToken })
        } else
            res.status(401).json({ message: "Unauthorized" })
    } catch (error) {
        res.status(500).json(error)
    }
}

async function refresh(req, res) {
    try {
        const { email } = req.refreshPayload
        const user = userService.findUserByEmail(email)
        const role = roleService.findRoleByUser(user)

        const jwtData = {
            email: email,
            admin: role.weight === 666
        }

        const accessToken = jwt.sign(jwtData)
        const refreshToken = jwt.sign(jwtData, REFRESH_SECRET, { expiresIn: "1d"})

        await sessionService.saveRefreshToken(user, refreshToken)
        res.status(200).json({ accessToken, refreshToken })
    } catch (error) {
        res.status(401).json({ message: "Unable to refresh the token", error })
    }
}

async function logout(req, res) {
    try {
        const { refreshToken } = req.body
        await sessionService.removeRefresh(refreshToken)

        res.status(200).send()
    } catch (error) {
        res.status(401).json({ message: "Unable to logout", error })
    }
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