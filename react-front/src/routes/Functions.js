import FunctionTable from "../components/FunctionTable"
import FunctionList from "../components/FunctionList"

import logoImage from "../assets/images/Logo-Odeone_jaune.png"

import "./styles/Functions.css"

export default function Functions() {
    return (
        <div className="funcs">
            <div className="title">
                <div className="title-img">
                    <img src={ logoImage } alt="Logo Odeone jaune" />
                </div>
                <h1>FONCTIONS</h1>
                <div className="underline-title"></div>
            </div>
            <div className="table">
                <FunctionTable tables={[
                    <FunctionList title="Fonction pesage" features={[
                        "Connexion jusqu'a 3 balances maximum",
                        "Contrôle de tolérance",
                        "Base de données articles avec images",
                        "Numéros de lots enregisrés",
                        "Base de données opérateurs",
                        "Base de données clients",
                        "Historique des pesées",
                        "Impression d'états",
                        "Impression d'étiquettes personnalisables",
                        "édition de codes-barres et QR codes",
                        "Lecture de codes-barres et QR codes",
                        "Sauvegardes manuelles et automatiques",
                        "Mise en réseau des postes de pesées",
                        "Supervision",
                        "Gestion des droits accordés par l'administrateur"
                    ]} />,
                    <FunctionList title="Fonction comptage" features={[
                        "Connexion jusqu'a 3 balances maximum",
                        "Contrôle de tolérance",
                        "Base de données articles avec images",
                        "Numéros de lots enregisrés",
                        "Base de données opérateurs",
                        "Base de données clients",
                        "Historique des pesées",
                        "Impression d'états",
                        "Impression d'étiquettes personnalisables",
                        "édition de codes-barres et QR codes",
                        "Lecture de codes-barres et QR codes",
                        "Sauvegardes manuelles et automatiques",
                        "Mise en réseau des postes de pesées",
                        "Supervision",
                        "Gestion des droits accordés par l'administrateur"
                    ]} />,
                    <FunctionList title="Fonction pesage" features={[
                        "Actuellement en cours de développement"
                    ]} />
                ]} />
            </div>
        </div>
    )
}