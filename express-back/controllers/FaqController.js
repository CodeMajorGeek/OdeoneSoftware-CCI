const faqService = require("../services/FaqService")

async function getAllFaqs(req, res) {
    const faqs = await faqService.findAllFaqs()
    res.json(faqs)
}

async function getFaqById(req, res) {
    const id = parseInt(req.params.id)
    const faq = await faqService.findFaqById(id)

    if (faq)
        res.json(faq)
    else
        res.status(404).json({ message: "FAQ not found !" })
}

async function createFaq(req, res) {
    const newFaq = await faqService.createFaq(req.body)
    res.status(201).json(newFaq)
}

async function updateFaq(req, res) {
    const id = parseInt(req.params.id)
    const updatedFaq = await faqService.editFaq(id, req.body)

    if (updatedFaq)
        res.json(updatedFaq)
    else
        res.status(404).json({ message: "FAQ not found !" })
}

async function deleteFaq(req, res) {
    const id = parseInt(req.params.id)
    const faq = await faqService.findFaqById(id)

    if (faq) {
        await faqService.removeFaq(id)
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