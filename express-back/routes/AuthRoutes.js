const express = require("express")
const router = express.Router()

const AuthMiddleware = require("../middlewares/AuthMiddleware")

const authController = require("../controllers/AuthController")

router.get("/", AuthMiddleware.authenticateToken, authController.authenticate)
router.get("/refresh", authController.refresh)
router.get("/logout", authController.logout)
router.post("/forgot", authController.forgot)
router.put("/forgot/confirm/:id", authController.forgotConfirm)

module.exports = router