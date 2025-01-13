const express = require("express")
const router = express.Router()

const jwtMiddleware = require("../middlewares/JWTMiddleware")
const faqController = require("../controllers/FaqController")

router.get("/", faqController.getAllFaqs)
router.get("/:id", faqController.getFaqById)
router.post("/", jwtMiddleware.validateAdminMiddleware, faqController.createFaq)
router.put("/:id", jwtMiddleware.validateAdminMiddleware, faqController.updateFaq)
router.delete("/:id", jwtMiddleware.validateAdminMiddleware, faqController.deleteFaq)

module.exports = router