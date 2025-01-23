const { Summaries, SummaryCreatedAt, SummaryModifiedAt } = require("./Database")
const { Op } = require("sequelize")

async function findAll() {
    try {
        // Récupérer uniquement les sommaires parents (sans sub_id)
        const parentSummaries = await Summaries.findAll({
            where: {
                sub_id: null
            },
            include: [{
                model: Summaries,
                as: 'subContent',
                required: false,
                where: {
                    sub_id: { [Op.not]: null }
                }
            }],
            raw: false, // Important pour avoir les instances Sequelize complètes
            nest: true  // Pour une meilleure structure des données imbriquées
        })

        // Vérifier et formater les données
        return parentSummaries
            .filter(parent => parent.id_summary) // Filtrer les entrées invalides
            .map(parent => ({
                id: parent.id_summary,
                functionName: parent.title,
                videoPath: parent.video_path,
                subContent: parent.subContent
                    .filter(sub => sub.id_summary) // Filtrer les sous-contenus invalides
                    .map(sub => ({
                        id: sub.id_summary,
                        functionName: sub.title,
                        videoPath: sub.video_path
                    }))
            }))
            .filter(parent => parent.id) // Filtrer une dernière fois les parents invalides
    } catch (error) {
        console.error("Erreur dans findAll:", error)
        throw error
    }
}

async function findById(id) {
    try {
        return await Summaries.findByPk(id)
    } catch (error) {
        throw error
    }
}

async function create(title, videoPath, userId, subId = null) {
    try {
        const summary = await Summaries.create({
            title,
            video_path: videoPath,
            sub_id: subId
        })

        await SummaryCreatedAt.create({
            created_at: new Date(),
            id_user: userId,
            id_summary: summary.id_summary
        })

        return summary
    } catch (error) {
        throw error
    }
}

async function update(id, title, videoPath, userId) {
    try {
        const summary = await Summaries.findByPk(id)
        if (!summary) throw new Error("Summary not found")

        await summary.update({
            title,
            ...(videoPath && { video_path: videoPath })
        })

        await SummaryModifiedAt.create({
            modified_at: new Date(),
            id_user: userId,
            id_summary: id
        })

        return summary
    } catch (error) {
        throw error
    }
}

async function remove(id) {
    try {
        const summary = await Summaries.findByPk(id)
        if (!summary) throw new Error("Summary not found")
        
        await summary.destroy()
        return true
    } catch (error) {
        throw error
    }
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
