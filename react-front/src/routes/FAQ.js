import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import "./styles/FAQ.css"

import FAQResults from "../components/FAQResults"
import FAQResult from "../components/FAQResult"

export default function FAQ() {
    return (
        <div className="faq">
            <div className="title">
                <h1>FAQ</h1>
                <div className="underline-title"></div>
            </div>
            <div className="search">
                <h2>Comment pouvons-nous vous aidez ?</h2>
                <div>
                    <form method="GET">
                        <FontAwesomeIcon icon={ faSearch } className="search-icon" />
                        <input type="text" name="search" placeholder="Saisissez un ou plusieurs mots clés" className="search-field" />
                        <input type="submit" value="Rechercher" className="search-btn" />
                    </form>
                </div>
            </div>
            <div className="result">
                <div className="title">
                    <h1>Question fréquentes</h1>
                </div>
                <div className="result-list">
                    <FAQResults results={[
                        <FAQResult 
                            question="Sur quel système d'exploitation fonctionne le logiciel ?"
                            answer="Sous Windows en 32 ou 64 bits. (Le 64 bits est à privilégier)." />,
                        <FAQResult 
                            question="Le logiciel est-il compatible avec toutes les balances du marché ?"
                            answer={ "Non, la balance doit être équipée d'au moins une sortie RS232/USB/Ethernet. " +
                            "Il est également nécessaire que le constructeur mette à disposition la notice du protocole de communication." } />
                    ]} />
                </div>
            </div>
        </div>
        
    )
}