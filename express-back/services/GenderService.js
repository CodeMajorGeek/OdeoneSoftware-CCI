const genderRepository = require("../repositories/GenderRepository")

async function getGenderByTitle(title) {
    return await genderRepository.getGenderByTitle(title)
}

async function findGenderById(id) {
    return await genderRepository.findGenderById(id)
}

module.exports = {
    getGenderByTitle,
    findGenderById
}