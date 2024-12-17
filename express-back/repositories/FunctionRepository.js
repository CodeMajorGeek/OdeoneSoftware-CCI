const dbFunction = require("./Database").Functions

async function getAllFunctions() {
    return await dbFunction.findAll()
}

async function getFunctionById(id) {
    return await dbFunction.findOne({ where: { id_function: id }})
}

async function addFunction(func) {
    return await dbFunction.create({ ...func, createdAt: Date.now() })
}

async function updateFunction(id, func) {
    return await dbFunction.update(func, {
        where: { id_function: id }
    })
}

async function removeFunction(id) {
    return await dbFunction.destroy({ where: { id_function: id }})
}

module.exports = {
    getAllFunctions,
    getFunctionById,
    addFunction,
    updateFunction,
    removeFunction
}