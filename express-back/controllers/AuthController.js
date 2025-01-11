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
        const user = await userService.findUserByEmail(email)
        const role = await roleService.findRoleByUser(user)

        const jwtData = {
            email: email,
            admin: role.weight === 666
        }

        const accessToken = jwt.sign(jwtData, TOKEN_SECRET, { expiresIn: "1h" })
        const refreshToken = jwt.sign(jwtData, REFRESH_SECRET, { expiresIn: "1d" })

        await sessionService.saveRefreshToken(user, refreshToken)
        res.status(200).json({ accessToken, refreshToken })
    } catch (error) {
        res.status(401).json({ message: "Impossible de rafraîchir le token", error })
    }
}

async function logout(req, res) {
    try {
        const { email } = req.auth
        const user = await userService.findUserByEmail(email)
        await sessionService.removeRefreshByUser(user)

        res.status(200).json({ message: "Déconnexion réussie" })
    } catch (error) {
        res.status(401).json({ message: "Impossible de se déconnecter", error })
    }
}

async function forgot(req, res) {
    try {
        const { email } = req.body
        
        if (!email) {
            return res.status(400).json({ message: "L'email est requis" })
        }

        const user = await userService.findUserByEmail(email)
        
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" })
        }
        let verifyId
        let existingUser
        do {
            verifyId = Math.floor(Math.random() * 1000000)
            existingUser = await userService.findUserByVerifyId(verifyId)
        } while (existingUser)
        
        await userService.updateVerifyId(user, verifyId);

        // TODO: Envoyer l'email avec le code de vérification
        
        res.status(200).json({ message: "Un email de réinitialisation a été envoyé" })
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la demande de réinitialisation", error })
    }
}

async function forgotConfirm(req, res) {

}

module.exports = {
    authenticate,
    refresh,
    logout,
    forgot,
    forgotConfirm
}