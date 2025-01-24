const functionRepository = require("../repositories/FunctionRepository")

async function findAllFunctions() {
    const functions = await functionRepository.getAllFunctions()
    return functions.map(func => ({
        id: func.id_function,
        title: func.title,
        content: func.content || ''
    }))
}

async function findFunctionById(id) {
    const func = await functionRepository.getFunctionById(id)
    if (!func) return null
    
    return {
        id: func.id_function,
        title: func.title,
        content: func.content || ''
    }
}

async function createFunction(func) {
    const newFunction = await functionRepository.addFunction({
        title: func.title,
        content: func.content
    })

    return {
        id: newFunction.id_function,
        title: newFunction.title,
        content: newFunction.content || ''
    }
}

async function editFunction(id, func) {
    const updatedFunction = await functionRepository.updateFunction(id, {
        title: func.title,
        content: func.content
    })

    if (!updatedFunction) return null

    return {
        id: updatedFunction.id_function,
        title: updatedFunction.title,
        content: updatedFunction.content || ''
    }
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