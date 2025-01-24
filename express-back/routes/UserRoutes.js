const express = require("express")
const router = express.Router()

const jwtMiddleware = require("../middlewares/JWTMiddleware")
const userController = require("../controllers/UserController")

router.get("/", jwtMiddleware.validateAdminMiddleware, userController.getAllUsers)
router.get("/me", jwtMiddleware.authenticateTokenMiddleware, userController.getUserByToken)
router.get("/:company", jwtMiddleware.validateAdminMiddleware, userController.getUserByCompany)
router.post("/", userController.createUser)
router.put("/me", jwtMiddleware.authenticateTokenMiddleware, userController.updateUserByToken)
router.put("/id/:id", jwtMiddleware.authenticateTokenMiddleware, userController.updateUser)
router.delete("/:id", jwtMiddleware.validateAdminMiddleware, userController.deleteUser)
router.delete("/me", jwtMiddleware.authenticateTokenMiddleware, userController.deleteOwnUser)

module.exports = router