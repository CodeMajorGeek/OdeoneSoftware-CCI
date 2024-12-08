import React from "react"

import "./styles/AdminHome.css"

import AdminSummary from "../../components/admin/AdminSummary"

export default function AdminHome() {
    const summaries = [
        {
            functionName: "Fonction Pesage",
            subContent: [
                {
                    functionName: "Fonction Pesage",
                },
                {
                    functionName: "Mémoire Alibi",
                },
            ],
        },
        {
            functionName: "Fonction Comptage",
            subContent: [
                {
                    functionName: "Fonction Comptage",
                },
                {
                    functionName: "Contrôle Comptage"
                },
            ],
        },
    ];
    
    const handleDelete = (parentIndex, index) => {
        console.log(`Supprimer l'élément à l'index [${parentIndex}, ${index}]`);
    };

    const handleModify = (parentIndex, index) => {
        console.log(`Modifier l'élément à l'index [${parentIndex}, ${index}]`);
    };

    const handleInsert = (parentIndex, index, type) => {
        console.log(
            `Insérer un élément de type '${type}' à l'index [${parentIndex}, ${index}]`
        );
    };

    return (
        <div>
            <AdminSummary
                summaries={summaries}
                onDelete={handleDelete}
                onModify={handleModify}
                onInsert={handleInsert}
            />
        </div>
    );
}
