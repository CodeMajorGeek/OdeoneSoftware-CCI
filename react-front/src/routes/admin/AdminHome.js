import React, { useState, useEffect } from "react"

import "./styles/AdminHome.css"

import AdminSummary from "../../components/admin/AdminSummary"
import { 
    apiGetAllSummaries, 
    apiCreateSummary, 
    apiUpdateSummary, 
    apiDeleteSummary 
} from "../../services/ApiService"

export default function AdminHome() {
    const [summaries, setSummaries] = useState([])

    useEffect(() => {
        loadSummaries()
    }, [])

    const loadSummaries = async () => {
        try {
            const data = await apiGetAllSummaries()
            setSummaries(data)
        } catch (error) {
            console.error("Erreur lors du chargement des sommaires:", error)
        }
    }

    const handleDelete = async (parentIndex, index) => {
        try {
            if (parentIndex === -1) {
                // Suppression d'un sommaire parent
                await apiDeleteSummary(summaries[index].id)
                // Mise à jour immédiate de l'état local
                const updatedSummaries = summaries.filter((_, i) => i !== index)
                setSummaries(updatedSummaries)
            } else {
                // Suppression d'une sous-partie
                await apiDeleteSummary(summaries[parentIndex].subContent[index].id)
                // Mise à jour immédiate de l'état local pour les sous-parties
                const updatedSummaries = [...summaries]
                updatedSummaries[parentIndex].subContent = updatedSummaries[parentIndex].subContent.filter((_, i) => i !== index)
                setSummaries(updatedSummaries)
            }
        } catch (error) {
            console.error("Erreur lors de la suppression:", error)
            // En cas d'erreur, recharger toute la liste
            await loadSummaries()
        }
    }

    const handleModify = async (parentIndex, index, newName, file) => {
        try {
            const summaryToUpdate = parentIndex === -1 
                ? summaries[index] 
                : summaries[parentIndex].subContent[index]
            
            await apiUpdateSummary(summaryToUpdate.id, {
                functionName: newName,
                file: file
            })
            await loadSummaries()
        } catch (error) {
            console.error("Erreur lors de la modification:", error)
        }
    }

    const handleInsert = async (parentIndex, index, type, data) => {
        try {
            if (type === "new") {
                await apiCreateSummary({
                    parentName: data.parentName,
                    subName: data.subName,
                    file: data.file
                })
            } else if (type === "sub") {
                await apiCreateSummary({
                    functionName: data.name,
                    file: data.file,
                    parentId: summaries[index].id
                })
            }
            await loadSummaries()
        } catch (error) {
            console.error("Erreur lors de l'insertion:", error)
        }
    }

    return (
        <div className="admin-home">
            <h1>Gestionnaire de sommaire</h1>
            <AdminSummary
                summaries={summaries}
                setSummaries={setSummaries}
                onDelete={handleDelete}
                onModify={handleModify}
                onInsert={handleInsert}
            />
        </div>
    );
}
