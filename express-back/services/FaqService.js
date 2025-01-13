const faqRepository = require("../repositories/FaqRepository")

async function findAllFaqs() {
    return await faqRepository.getAllFaqs()
}

async function findFaqsBySearch(searchWords) {
    return await faqRepository.getFaqsBySearch(searchWords)
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
    findFaqsBySearch,
    findFaqById,
    createFaq,
    editFaq,
    removeFaq
}