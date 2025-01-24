const SummaryRepository = require("../repositories/SummaryRepository")

async function findAllSummaries() {
    return await SummaryRepository.findAll()
}

async function findSummaryById(id) {
    return await SummaryRepository.findById(id)
}

async function createSummary(title, videoPath, userId, subId) {
    return await SummaryRepository.create(title, videoPath, userId, subId)
}

async function editSummary(id, title, videoPath, userId) {
    return await SummaryRepository.update(id, title, videoPath, userId)
}

async function removeSummary(id) {
    return await SummaryRepository.remove(id)
}

module.exports = {
    findAllSummaries,
    findSummaryById,
    createSummary,
    editSummary,
    removeSummary
}
