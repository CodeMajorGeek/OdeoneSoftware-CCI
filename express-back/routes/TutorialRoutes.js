const express = require("express")
const router = express.Router()

const tutorialController = require("../controllers/TutorialController")

router.get("/", tutorialController.getAllTutorials)
router.get("/:id", tutorialController.getTutorialById)
router.post("/", tutorialController.createTutorial)
router.put("/:id", tutorialController.updateTutorial)
router.delete("/:id", tutorialController.deleteTutorial)

module.exports = router