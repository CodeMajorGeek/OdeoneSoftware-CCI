const express = require("express")
const router = express.Router()

const jwtMiddleware = require("../middlewares/JWTMiddleware")
const userController = require("../controllers/UserController")

router.get("/", jwtMiddleware.authenticateTokenMiddleware, userController.getAllUsers)
router.get("/me", jwtMiddleware.authenticateTokenMiddleware, userController.getUserByToken)
// router.get("/:id", jwtMiddleware.authenticateTokenMiddleware, userController.getUserById)
// router.get("/:email", jwtMiddleware.authenticateTokenMiddleware, userController.getUserByEmail)
router.get("/:company", jwtMiddleware.authenticateTokenMiddleware, userController.getUserByCompany)
router.post("/", userController.createUser)
router.put("/me", jwtMiddleware.authenticateTokenMiddleware, userController.updateUserByToken)
router.put("/id/:id", jwtMiddleware.authenticateTokenMiddleware, userController.updateUser)
router.delete("/:id", jwtMiddleware.authenticateTokenMiddleware, userController.deleteUser)

module.exports = router