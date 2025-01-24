import React, { useState, useEffect } from "react"
import { apiGetFunctions, apiCreateFunction, apiEditFunction, apiRemoveFunction } from "../../services/ApiService"
import "./styles/AdminFunctions.css"

export default function AdminFunctions() {
    const [functions, setFunctions] = useState([])
    const [error, setError] = useState(null)
    const [newFunction, setNewFunction] = useState({ 
        title: '', 
        features: [] 
    })
    const [editingFunction, setEditingFunction] = useState(null)

    useEffect(() => {
        loadFunctions()
    }, [])

    const loadFunctions = async () => {
        try {
            const data = await apiGetFunctions()
            setFunctions(data || [])
            setError(null)
        } catch (error) {
            console.error("Erreur:", error)
            setError(error.message || "Erreur lors du chargement des fonctions")
            setFunctions([])
        }
    }

    const handleEditFeature = async (title) => {
        const functionToEdit = functions.find(f => f.title === title)
        if (!functionToEdit) return
        setEditingFunction({
            ...functionToEdit,
            features: functionToEdit.features || []
        })
    }

    const handleSaveEdit = async () => {
        if (!editingFunction) return
        
        try {
            await apiEditFunction({
                id: editingFunction.id,
                title: editingFunction.title,
                features: editingFunction.features.filter(f => f.trim() !== '')
            })
            await loadFunctions()
            setEditingFunction(null)
            setError(null)
        } catch (error) {
            console.error("Erreur:", error)
            setError(error.message || "Erreur lors de la modification de la fonction")
        }
    }

    const handleDeleteFeature = async (title) => {
        const functionToDelete = functions.find(f => f.title === title)
        if (!functionToDelete) return

        if (window.confirm("Voulez-vous vraiment supprimer cette fonction ?")) {
            try {
                await apiRemoveFunction({ id: functionToDelete.id })
                await loadFunctions()
                setError(null)
            } catch (error) {
                console.error("Erreur:", error)
                setError(error.message || "Erreur lors de la suppression de la fonction")
            }
        }
    }

    const handleAddFunction = async () => {
        try {
            if (!newFunction.title) throw new Error("Le titre est requis")

            const features = newFunction.features
                .filter(f => f.trim() !== '')

            await apiCreateFunction({
                title: newFunction.title,
                features: features
            })
            await loadFunctions()
            setNewFunction({ title: '', features: [] })
            setError(null)
        } catch (error) {
            console.error("Erreur:", error)
            setError(error.message || "Erreur lors de la création de la fonction")
        }
    }

    return (
        <div className="admin-functions">
            <h1>Gestion des Fonctionnalités</h1>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            {functions.map((func, index) => (
                <div key={index} className="function-table">
                    <div className="function-list">
                        <h3>{func.title}</h3>
                        {editingFunction?.id === func.id ? (
                            <div className="function-edit">
                                <textarea
                                    value={editingFunction.features.join('\n')}
                                    onChange={(e) => setEditingFunction({
                                        ...editingFunction,
                                        features: e.target.value.split('\n')
                                    })}
                                    className="function-edit-field"
                                    rows={5}
                                    placeholder="Une fonctionnalité par ligne"
                                />
                                <div className="button-container">
                                    <button className="save-btn" onClick={handleSaveEdit}>
                                        Enregistrer
                                    </button>
                                    <button className="cancel-btn" onClick={() => setEditingFunction(null)}>
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <ul>
                                    {func.features.map((feature, idx) => (
                                        <li key={idx} className="feature-item">
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <div className="button-container">
                                    <button className="edit-btn" onClick={() => handleEditFeature(func.title)}>
                                        Modifier
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDeleteFeature(func.title)}>
                                        Supprimer
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ))}
            <div className="add-function-container">
                <input
                    type="text"
                    placeholder="Nom de la nouvelle fonction"
                    value={newFunction.title}
                    onChange={(e) => setNewFunction({ ...newFunction, title: e.target.value })}
                    className="function-input"
                />
                <textarea
                    placeholder="Une fonctionnalité par ligne"
                    value={newFunction.features.join('\n')}
                    onChange={(e) => setNewFunction({ 
                        ...newFunction, 
                        features: e.target.value.split('\n')
                    })}
                    className="function-textarea"
                    rows={5}
                />
                <button 
                    className="add-function-btn"
                    onClick={handleAddFunction}
                    disabled={!newFunction.title}
                >
                    Ajouter une fonction
                </button>
            </div>
        </div>
    )
}
