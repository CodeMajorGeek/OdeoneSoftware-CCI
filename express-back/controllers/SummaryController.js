const summaryService = require("../services/SummaryService")
const userService = require("../services/UserService")
const jwt = require("jsonwebtoken")
const fs = require('fs').promises

const TOKEN_SECRET = process.env.TOKEN_SECRET

async function getAllSummaries(req, res) {
    try {
        const summaries = await summaryService.findAllSummaries()
        
        // Vérification supplémentaire pour s'assurer que nous avons des données valides
        const formattedSummaries = summaries
            .filter(summary => summary && summary.id)
            .map(summary => {
                const formattedSummary = {
                    id: summary.id,
                    functionName: summary.functionName,
                    subContent: Array.isArray(summary.subContent) 
                        ? summary.subContent.filter(sub => sub && sub.id)
                        : []
                }
                if (summary.videoPath) {
                    formattedSummary.videoPath = summary.videoPath
                }
                return formattedSummary
            })

        res.json(formattedSummaries)
    } catch (error) {
        console.error("Erreur dans getAllSummaries:", error)
        res.status(500).json({ 
            message: "Erreur lors de la récupération des sommaires",
            error: error.message 
        })
    }
}

async function getSummaryById(req, res) {
    try {
        const summary = await summaryService.findSummaryById(req.params.id)
        if (!summary) {
            return res.status(404).json({ message: "Sommaire non trouvé" })
        }
        const formattedSummary = {
            id: summary.id_summary,
            functionName: summary.title,
            videoPath: summary.video_path
        }
        res.json(formattedSummary)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du sommaire" })
    }
}

async function createSummary(req, res) {
    try {
        const encodedToken = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(encodedToken, TOKEN_SECRET)
        const user = await userService.findUserByEmail(decodedToken.email)

        if (req.body.parentName) {
            // Création d'un nouveau sommaire parent + sous-partie
            const parent = await summaryService.createSummary(
                req.body.parentName,
                null,
                user.id_user,
                null
            )

            const sub = await summaryService.createSummary(
                req.body.subName,
                req.filePath,
                user.id_user,
                parent.id_summary
            )

            const formattedResponse = {
                id: parent.id_summary,
                functionName: parent.title,
                videoPath: null,
                subContent: [{
                    id: sub.id_summary,
                    functionName: sub.title,
                    videoPath: sub.video_path
                }]
            }

            res.status(201).json(formattedResponse)
        } else {
            // Création d'une sous-partie simple
            const summary = await summaryService.createSummary(
                req.body.functionName,
                req.filePath,
                user.id_user,
                req.body.parentId
            )

            const formattedSummary = {
                id: summary.id_summary,
                functionName: summary.title,
                videoPath: summary.video_path
            }

            res.status(201).json(formattedSummary)
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du sommaire", error: error.message })
    }
}

async function updateSummary(req, res) {
    try {
        const encodedToken = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(encodedToken, TOKEN_SECRET)
        const user = await userService.findUserByEmail(decodedToken.email)

        const { functionName } = req.body
        const videoPath = req.filePath || null
        
        const oldSummary = await summaryService.findSummaryById(req.params.id)
        if (!oldSummary) {
            return res.status(404).json({ message: "Sommaire non trouvé" })
        }

        if (videoPath && oldSummary.video_path) {
            await fs.unlink(oldSummary.video_path)
        }

        const summary = await summaryService.editSummary(
            req.params.id,
            functionName,
            videoPath,
            user.id_user
        )

        const formattedSummary = {
            id: summary.id_summary,
            functionName: summary.title,
            videoPath: summary.video_path
        }

        res.json(formattedSummary)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la modification du sommaire" })
    }
}

async function deleteSummary(req, res) {
    try {
        const summaryId = parseInt(req.params.id)
        const summary = await summaryService.findSummaryById(summaryId)
        if (!summary) {
            return res.status(404).json({ message: "Sommaire non trouvé" })
        }

        if (summary.video_path) {
            await fs.unlink(summary.video_path)
        }

        await summaryService.removeSummary(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du sommaire", error: error.message })
    }
}

module.exports = {
    getAllSummaries,
    getSummaryById,
    createSummary,
    updateSummary,
    deleteSummary
}