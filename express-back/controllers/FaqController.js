const faqService = require("../services/FaqService")

function getAllFaqs(req, res) {
    const faqs = faqService.findAllFaqs()
    res.json(faqs)
}

function getFaqById(req, res) {
    const id = parseInt(req.params.id)
    const faq = faqService.findFaqById(id)

    if (faq)
        res.json(faq)
    else
        res.status(404).json({ message: "FAQ not found !" })
}

function createFaq(req, res) {
    const newFaq = faqService.createFaq(req.body)
    res.status(201).json(newFaq)
}

function updateFaq(req, res) {
    const id = parseInt(req.params.id)
    const updatedFaq = faqService.editFaq(id, req.body)

    if (updatedFaq)
        res.json(updatedFaq)
    else
        res.status(404).json({ message: "FAQ not found !" })
}

function deleteFaq(req, res) {
    const id = parseInt(req.params.id)
    const faq = faqService.findFaqById(id)

    if (faq) {
        faqService.removeFaq(id)
        res.status(204).send()
    } else
        res.status(404).json({ message: "FAQ not found !" })
}

module.exports = {
    getAllFaqs,
    getFaqById,
    createFaq,
    updateFaq,
    deleteFaq
}