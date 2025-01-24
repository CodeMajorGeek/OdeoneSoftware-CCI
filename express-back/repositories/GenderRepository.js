const dbGender = require("./Database").Genders

async function getGenderByTitle(sTitle) {
    return await dbGender.findOne({ where: { title: sTitle }})
}

async function findGenderById(id) {
    return await dbGender.findByPk(id)
}

module.exports = {
    getGenderByTitle,
    findGenderById
}