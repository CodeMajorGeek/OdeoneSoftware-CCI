import { useState, useEffect } from "react"
import FunctionTable from "../components/FunctionTable"
import FunctionList from "../components/FunctionList"
import { apiGetFunctions } from "../services/ApiService"

import logoImage from "../assets/images/Logo-Odeone_jaune.png"

import "./styles/Functions.css"

export default function Functions() {
    const [functions, setFunctions] = useState([])
    const [error, setError] = useState(null)

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

    return (
        <div className="funcs">
            <div className="title">
                <div className="title-img">
                    <img src={logoImage} alt="Logo Odeone jaune" />
                </div>
                <h1>FONCTIONS</h1>
                <div className="underline-title"></div>
            </div>
            <div className="table">
                <FunctionTable tables={
                    functions.map(func => (
                        <FunctionList 
                            key={func.id}
                            title={func.title} 
                            features={func.features} 
                        />
                    ))
                } />
            </div>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
        </div>
    )
}