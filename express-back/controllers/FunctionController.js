const functionService = require("../services/FunctionService")

async function getAllFunctions(req, res) {
    const functions = await functionService.findAllFunctions()
    res.json(functions)
}

async function getFunctionById(req, res) {
    const id = parseInt(req.params.id)
    const func = await functionService.findFunctionById(id)

    if (func)
        res.json(func)
    else
        res.status(404).json({ message: "Function not found !" })
}

async function createFunction(req, res) {
    const newFunction = functionService.createFunction(req.body)
    res.status(201).json(newFunction)
}

async function updateFunction(req, res) {
    const id = parseInt(req.params.id)
    const updatedFunc = await functionService.editFunction(id, req.body)

    if (updatedFunc)
        res.json(updatedFunc)
    else
        res.status(404).json({ message: "Function not found !" })
}

async function deleteFunction(req, res) {
    const id = parseInt(req.params.id)
    const func = await functionService.findFunctionById(id)

    if (func) {
        await functionService.removeFunction(id)
        res.status(204).send()
    } else
        res.status(404).json({ message: "Function not found !" })
}

module.exports = {
    getAllFunctions,
    getFunctionById,
    createFunction,
    updateFunction,
    deleteFunction
}