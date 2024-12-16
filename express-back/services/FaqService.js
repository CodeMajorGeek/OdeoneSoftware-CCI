const faqRepository = require("../repositories/FaqRepository")

async function findAllFaqs() {
    return await faqRepository.getAllFaqs()
}

async function findFaqById(id) {
    return await faqRepository.getFaqById(id)
}

async function createFaq(faq) {
    return await faqRepository.addFaq(faq)
}

async function editFaq(id, faq) {
    return await faqRepository.updateFaq(id, faq)
}

async function removeFaq(id) {
    return await faqRepository.deleteFaq(id)
}

module.exports = {
    findAllFaqs,
    findFaqById,
    createFaq,
    editFaq,
    removeFaq
}