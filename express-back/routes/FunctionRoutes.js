const express = require("express")
const router = express.Router()

const jwtMiddleware = require("../middlewares/JWTMiddleware")

const functionController = require("../controllers/FunctionController")

router.get("/", functionController.getAllFunctions)
router.get("/:id", jwtMiddleware.validateAdminMiddleware, functionController.getFunctionById)
router.post("/", jwtMiddleware.validateAdminMiddleware, functionController.createFunction)
router.put("/:id", jwtMiddleware.validateAdminMiddleware, functionController.updateFunction)
router.delete("/:id", jwtMiddleware.validateAdminMiddleware, functionController.deleteFunction)

module.exports = router