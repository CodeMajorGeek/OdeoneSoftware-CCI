const genderRepository = require("../repositories/GenderRepository")

async function getGenderByTitle(title) {
    return await genderRepository.getGenderByTitle(title)
}

module.exports = {
    getGenderByTitle
}