const express = require("express")
const router = express.Router()

const functionController = require("../controllers/FunctionController")

router.get("/", functionController.getAllFunctions)
router.get("/:id", functionController.getFunctionById)
router.post("/", functionController.createFunction)
router.put("/:id", functionController.updateFunction)
router.delete("/:id", functionController.deleteFunction)

module.exports = router