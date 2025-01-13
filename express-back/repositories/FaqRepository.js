const { Op, Sequelize } = require("sequelize");
const dbFaq = require("./Database").Faqs;

async function getAllFaqs() {
    const faqs = await dbFaq.findAll({
        raw: true,
        attributes: [
            ['id_faq', 'id'],
            'question',
            'answer'
        ]
    });
    return faqs;
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
        raw: true,
        attributes: [
            ['id_faq', 'id'],
            'question',
            'answer'
        ],
        where: { id_faq: id }
    });
}

async function addFaq(faq) {
    return await dbFaq.create({ ...faq })
}

async function editFaq(id, faq) {
    return await dbFaq.update(faq, {
        where: { id_faq: id }
    })
}

async function deleteFaq(id) {
    return await dbFaq.destroy({
        where: { id_faq: id }
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