const express = require("express")
const router = express.Router()

const authMiddleware = require("../middlewares/JWTMiddleware")
const authController = require("../controllers/AuthController")

router.post("/", authController.authenticate)
router.get("/validate", authMiddleware.authenticateTokenMiddleware, authController.validate)
router.post("/refresh", authMiddleware.refreshTokenMiddleware, authController.refresh)
router.post("/logout", authMiddleware.authenticateTokenMiddleware, authController.logout)
router.post("/forgot", authController.forgot)
router.put("/forgot/confirm/:id", authController.forgotConfirm)

module.exports = router