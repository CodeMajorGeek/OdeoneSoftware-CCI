const { Op, Sequelize } = require("sequelize");
const dbFaq = require("./Database").Faqs;

async function getAllFaqs() {
    return await dbFaq.findAll()
}

async function getFaqsBySearch(searchWords) {
    const searchQuery = searchWords
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 2)
        .map(word => `${word}:*`)
        .join(' & ');

    return await dbFaq.findAll({
        where: Sequelize.literal(`
            search_vector @@ to_tsquery('french', :query)
        `),
        replacements: { query: searchQuery },
        order: [
            [
                Sequelize.literal(`
                    ts_rank(search_vector, to_tsquery('french', :query))
                `),
                'DESC'
            ]
        ]
    });
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
    deleteFaq,
    getFaqsBySearch
}