const jwt = require("jsonwebtoken")

const userService = require("../services/UserService")
const sessionService = require("../services/SessionService")

const TOKEN_SECRET = process.env.TOKEN_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

const authenticateTokenMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({ error: "Token manquant" })
        }

        const authHeader = req.headers.authorization
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ error: "Format de token invalide" })
        }

        const token = authHeader.split(" ")[1]
        if (!token) {
            return res.status(400).json({ error: "Token manquant" })
        }

        const decodedToken = jwt.verify(token, TOKEN_SECRET)
        
        const user = await userService.findUserByEmail(decodedToken.email)
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" })
        }

        const session = await sessionService.findRefreshByUser(user)
        if (!session) {
            return res.status(403).json({ error: "Session invalide" })
        }

        req.auth = {
            email: decodedToken.email,
            userId: user.id
        }

        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ error: "Token invalide" })
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ error: "Token expiré" })
        }
        res.status(500).json({ error: "Erreur interne du serveur" })
    }
}

const validateAdminMiddleware = async (req, res, next) => {
    console.log(req.auth)
    try {
        if (!req.auth || !req.auth.email) {
            return res.status(401).json({ error: "Non autorisé" })
        }

        const user = await userService.findUserByEmail(req.auth.email)
        if (!user) {
            return res.status(404).json({ error: "Accès refusé" })
        }

        if (!user.is_admin) {
            return res.status(403).json({ error: "Accès refusé" })
        }

        next()
    } catch (error) {
        res.status(500).json({ error: "Erreur interne du serveur" })
    }
}

const refreshTokenMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({ error: "Token de rafraîchissement manquant" })
        }

        const authHeader = req.headers.authorization
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ error: "Format de token invalide" })
        }

        const token = authHeader.split(" ")[1]
        if (!token) {
            return res.status(400).json({ error: "Token de rafraîchissement manquant" })
        }

        const decodedToken = jwt.verify(token, REFRESH_SECRET)
        
        const user = await userService.findUserByEmail(decodedToken.email)
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" })
        }

        const session = await sessionService.findRefreshByUser(user)
        if (!session || session.refresh !== token) {
            return res.status(403).json({ error: "Token de rafraîchissement invalide" })
        }

        req.refreshPayload = { 
            email: decodedToken.email,
            userId: user.id
        }
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ error: "Token invalide" })
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ error: "Token de rafraîchissement expiré" })
        }
        res.status(500).json({ error: "Erreur interne du serveur" })
    }
}

module.exports = {
    authenticateTokenMiddleware,
    refreshTokenMiddleware,
    validateAdminMiddleware
}