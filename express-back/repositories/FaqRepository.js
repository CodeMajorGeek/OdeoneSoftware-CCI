const dbFaq = require("./Database").Faqs

async function getAllFaqs() {
    return await dbFaq.findAll()
}

async function getFaqById(id) {
    return await dbFaq.findOne({
        where: { id_faq: id }
    })
}

async function addFaq(faq) {
    return (await dbFaq.create({ ...faq }))
}

async function editFaq(id, faq) {
    return await dbFaq.update(faq, {
        where: { faq_id: id }
    })
}

async function deleteFaq(id) {
    return await dbFaq.destroy({
        where: { faq_id: id }
    })
}

module.exports = {
    getAllFaqs,
    getFaqById,
    addFaq,
    editFaq,
    deleteFaq
}