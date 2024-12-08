import React, { useState } from "react"
import "./styles/AdminFunctions.css"

function FunctionList({ title, features, onEdit, onDelete }) {
    return (
        <div className="function-list">
            <h3>{title}</h3>
            <ul>
                {features.map((feature, index) => (
                    <li key={index} className="feature-item">
                        <span>{feature}</span>
                        <div className="button-container">
                            <button
                                className="edit-btn"
                                onClick={() => onEdit(title, index)}
                            >
                                Modifier
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => onDelete(title, index)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default function AdminFunctions() {
    const [tables, setTables] = useState([
        {
            title: "Fonction Pesage",
            features: [
                "Connexion jusqu'à 3 balances maximum",
                "Contrôle de tolérance",
                "Base de données articles avec images",
                "Numéros de lots enregistrés",
                "Base de données opérateurs",
                "Base de données clients",
                "Historique des pesées",
                "Impression d'états",
                "Impression d'étiquettes personnalisables",
                "Édition de codes-barres et QR codes",
                "Lecture de codes-barres et QR codes",
                "Sauvegardes manuelles et automatiques",
                "Mise en réseau des postes de pesées",
                "Supervision",
                "Gestion des droits accordés par l'administrateur"
            ]
        },
        {
            title: "Fonction Comptage",
            features: [
                "Connexion jusqu'à 3 balances maximum",
                "Contrôle de tolérance",
                "Base de données articles avec images",
                "Numéros de lots enregistrés",
                "Base de données opérateurs",
                "Base de données clients",
                "Historique des pesées",
                "Impression d'états",
                "Impression d'étiquettes personnalisables",
                "Édition de codes-barres et QR codes",
                "Lecture de codes-barres et QR codes",
                "Sauvegardes manuelles et automatiques",
                "Mise en réseau des postes de pesées",
                "Supervision",
                "Gestion des droits accordés par l'administrateur"
            ]
        },
        {
            title: "Fonction Pesage (Développement)",
            features: ["Actuellement en cours de développement"]
        }
    ])

    const handleEditFeature = (title, featureIndex) => {
        const newFeature = prompt(
            "Modifier la fonctionnalité :",
            tables.find(t => t.title === title).features[featureIndex]
        )
        if (newFeature) {
            setTables(prevTables =>
                prevTables.map(table =>
                    table.title === title
                        ? {
                              ...table,
                              features: table.features.map((f, index) =>
                                  index === featureIndex ? newFeature : f
                              )
                          }
                        : table
                )
            )
        }
    }

    const handleDeleteFeature = (title, featureIndex) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette fonctionnalité ?")) {
            setTables(prevTables =>
                prevTables.map(table =>
                    table.title === title
                        ? {
                              ...table,
                              features: table.features.filter((_, index) => index !== featureIndex)
                          }
                        : table
                )
            )
        }
    }

    const handleAddFeature = (title) => {
        const newFeature = prompt("Ajouter une nouvelle fonctionnalité :")
        if (newFeature) {
            setTables(prevTables =>
                prevTables.map(table =>
                    table.title === title
                        ? {
                              ...table,
                              features: [...table.features, newFeature]
                          }
                        : table
                )
            )
        }
    }

    return (
        <div className="admin-functions">
            <h1>Gestion des Fonctionnalités</h1>
            {tables.map((table, index) => (
                <div key={index} className="function-table">
                    <FunctionList
                        title={table.title}
                        features={table.features}
                        onEdit={handleEditFeature}
                        onDelete={handleDeleteFeature}
                    />
                    <button
                        className="add-feature-btn"
                        onClick={() => handleAddFeature(table.title)}
                    >
                        Ajouter une fonctionnalité
                    </button>
                </div>
            ))}
        </div>
    )
}
