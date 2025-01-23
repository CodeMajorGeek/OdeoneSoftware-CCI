const express = require("express")
const router = express.Router()

const jwtMiddleware = require("../middlewares/JWTMiddleware")
const upload = require("../middlewares/MulterConfig")

const summaryController = require("../controllers/SummaryController")

router.get("/", summaryController.getAllSummaries)
router.get("/:id", summaryController.getSummaryById)
router.post("/", jwtMiddleware.authenticateTokenMiddleware, upload.single('file'), summaryController.createSummary)
router.put("/:id", jwtMiddleware.authenticateTokenMiddleware, upload.single('file'), summaryController.updateSummary)
router.delete("/:id", jwtMiddleware.authenticateTokenMiddleware, summaryController.deleteSummary)

module.exports = router