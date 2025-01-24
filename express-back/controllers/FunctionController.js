const functionService = require("../services/FunctionService")

async function getAllFunctions(req, res) {
    try {
        const functions = await functionService.findAllFunctions()
        const transformedFunctions = functions.map(func => ({
            ...func,
            features: func.content ? func.content.split('\n') : []
        }))
        res.json(transformedFunctions)
    } catch (error) {
        res.status(500).json({ message: error.message || "Erreur lors de la récupération des fonctions" })
    }
}

async function getFunctionById(req, res) {
    try {
        const id = parseInt(req.params.id)
        const func = await functionService.findFunctionById(id)

        if (func) {
            const transformedFunc = {
                ...func,
                features: func.content ? func.content.split('\n') : []
            }
            res.json(transformedFunc)
        } else {
            res.status(404).json({ message: "Fonction non trouvée" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message || "Erreur lors de la récupération de la fonction" })
    }
}

async function createFunction(req, res) {
    try {
        const functionData = {
            title: req.body.title,
            content: req.body.features ? req.body.features.join('\n') : ''
        }
        const newFunction = await functionService.createFunction(functionData)
        res.status(201).json(newFunction)
    } catch (error) {
        res.status(400).json({ message: error.message || "Erreur lors de la création de la fonction" })
    }
}

async function updateFunction(req, res) {
    try {
        const id = parseInt(req.params.id)
        const functionData = {
            title: req.body.title,
            content: req.body.features ? req.body.features.join('\n') : ''
        }
        const updatedFunc = await functionService.editFunction(id, functionData)

        if (updatedFunc) {
            res.json(updatedFunc)
        } else {
            res.status(404).json({ message: "Fonction non trouvée" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message || "Erreur lors de la modification de la fonction" })
    }
}

async function deleteFunction(req, res) {
    try {
        const id = parseInt(req.params.id)
        const func = await functionService.findFunctionById(id)

        if (func) {
            await functionService.deleteFunction(id)
            res.status(204).send()
        } else {
            res.status(404).json({ message: "Fonction non trouvée" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message || "Erreur lors de la suppression de la fonction" })
    }
}

module.exports = {
    getAllFunctions,
    getFunctionById,
    createFunction,
    updateFunction,
    deleteFunction
}