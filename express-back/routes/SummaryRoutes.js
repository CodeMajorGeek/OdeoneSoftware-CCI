const express = require("express")
const router = express.Router()

const summaryController = require("../controllers/SummaryController")

router.get("/", summaryController.getAllSummaries)
router.get("/:id", summaryController.getSummaryById)
router.post("/", summaryController.createSummary)
router.put("/:id", summaryController.updateSummary)
router.delete("/:id", summaryController.deleteSummary)

module.exports = router