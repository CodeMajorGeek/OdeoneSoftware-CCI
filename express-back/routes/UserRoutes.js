const express = require("express")
const router = express.Router()

const authMiddleware = require("../middlewares/AuthMiddleware")
const userController = require("../controllers/UserController")

router.get("/", authMiddleware.authenticateTokenMiddleware, userController.getAllUsers)
router.get("/:id", authMiddleware.authenticateTokenMiddleware, userController.getUserById)
router.get("/:email", authMiddleware.authenticateTokenMiddleware, userController.getUserByEmail)
router.get("/:company", authMiddleware.authenticateTokenMiddleware, userController.getUserByCompany)
router.post("/", userController.createUser)
router.put("/:id", authMiddleware.authenticateTokenMiddleware, userController.updateUser)
router.delete("/:id", authMiddleware.authenticateTokenMiddleware, userController.deleteUser)

module.exports = router