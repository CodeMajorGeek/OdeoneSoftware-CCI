const functionRepository = require("../repositories/FunctionRepository")

async function findAllFunctions() {
    return await functionRepository.getAllFunctions()
}

async function findFunctionById(id) {
    return await functionRepository.getFunctionById(id)
}

async function createFunction(func) {
    return await functionRepository.addFunction(func)
}

async function editFunction(id, func) {
    return await functionRepository.updateFunction(id, func)
}

async function deleteFunction(id) {
    return await functionRepository.removeFunction(id)
}

module.exports = {
    findAllFunctions,
    findFunctionById,
    createFunction,
    editFunction,
    deleteFunction
}