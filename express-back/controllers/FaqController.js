const faqService = require("../services/FaqService")

async function getAllFaqs(req, res) {
    try {
        const searchWords = req.query.search
        let faqs
        
        if (searchWords) {
            faqs = await faqService.findFaqsBySearch(searchWords)
        } else {
            faqs = await faqService.findAllFaqs()
        }
        res.json(faqs)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des FAQs", error })
    }
}

async function getFaqById(req, res) {
    try {
        const id = parseInt(req.params.id)
        const faq = await faqService.findFaqById(id)

        if (faq)
            res.json(faq)
        else
            res.status(404).json({ message: "FAQ non trouvée" })
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la FAQ", error })
    }
}

async function createFaq(req, res) {
    try {
        const newFaq = await faqService.createFaq(req.body)
        res.status(201).json(newFaq)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la FAQ", error })
    }
}

async function updateFaq(req, res) {
    try {
        const id = parseInt(req.params.id)
        const updatedFaq = await faqService.editFaq(id, req.body)

        if (updatedFaq)
            res.json(updatedFaq)
        else
            res.status(404).json({ message: "FAQ non trouvée" })
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la modification de la FAQ", error })
    }
}

async function deleteFaq(req, res) {
    try {
        const id = parseInt(req.params.id)
        const faq = await faqService.findFaqById(id)

        if (faq) {
            await faqService.removeFaq(id)
            res.status(204).send()
        } else
            res.status(404).json({ message: "FAQ non trouvée" })
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la FAQ", error })
    }
}

module.exports = {
    getAllFaqs,
    getFaqById,
    createFaq,
    updateFaq,
    deleteFaq
}