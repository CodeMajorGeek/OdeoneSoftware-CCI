const faqService = require("../services/FaqService")

async function getAllFaqs(req, res) {
    try {
        const searchWords = req.query.search
        
        let faqs
        if (searchWords)
            faqs = await faqService.findFaqsBySearch(searchWords)
         else
            faqs = await faqService.findAllFaqs()
        
        if (!faqs)
            res.status(404).json({ message: "Aucune FAQ trouvée !" })
        
        const faqsMask = await Promise.all(faqs.map(async (faq) => {
            return {
                id: faq.id,
                question: faq.question,
                answer: faq.answer
            }
        }))

        res.json(faqsMask)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des FAQs", error })
    }
}

async function getFaqById(req, res) {
    try {
        const id = parseInt(req.params.id)
        const faq = await faqService.findFaqById(id)

        if (!faq)
            res.status(404).json({ message: "FAQ non trouvée" })

        const faqMask = {
            id: faq.id,
            question: faq.question,
            answer: faq.answer
        }

        res.json(faqMask)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la FAQ", error })
    }
}

async function createFaq(req, res) {
    try {
        const newFaq = await faqService.createFaq(req.body)

        if (!newFaq)
            res.status(404).json({ message: "Erreur lors de la création de la FAQ" })

        const faqMask = {
            id: newFaq.id,
            question: newFaq.question,
            answer: newFaq.answer
        }

        res.status(201).json(faqMask)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la FAQ", error })
    }
}

async function updateFaq(req, res) {
    try {
        const id = parseInt(req.params.id)
        const updatedFaq = await faqService.editFaq(id, req.body)

        if (!updatedFaq)
            res.status(404).json({ message: "FAQ non trouvée" })

        const faqMask = {
            id: updatedFaq.id,
            question: updatedFaq.question,
            answer: updatedFaq.answer
        }

        res.json(faqMask)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la modification de la FAQ", error })
    }
}

async function deleteFaq(req, res) {
    try {
        const id = parseInt(req.params.id)
        const faq = await faqService.findFaqById(id)

        if (!faq)
            res.status(404).json({ message: "FAQ non trouvée" })

        await faqService.removeFaq(id)
        res.status(204).send()
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