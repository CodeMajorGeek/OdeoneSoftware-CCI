const dbGender = require("./Database").Genders

async function getGenderByTitle(sTitle) {
    return await dbGender.findOne({ where: { title: sTitle }})
}

module.exports = {
    getGenderByTitle
}