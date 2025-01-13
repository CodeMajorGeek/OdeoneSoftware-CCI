import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { apiGetFaqs } from "../services/ApiService"

import FAQResults from "../components/FAQResults"
import FAQResult from "../components/FAQResult"

import "./styles/FAQ.css"

export default function FAQ() {
    const [faqs, setFaqs] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchWords, setSearchWords] = useState("")

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const data = await apiGetFaqs(searchWords)
                console.log(data)
                if (Array.isArray(data)) {
                    setFaqs(data)
                } else {
                    console.error("Format de données incorrect reçu de l'API")
                    setFaqs([])
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des FAQs :", error)
                setFaqs([])
            } finally {
                setLoading(false)
            }
        }
        fetchFaqs()
    }, [searchWords])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
    }

    const handleSearchChange = (e) => {
        setSearchWords(e.target.value)
    }

    return (
        <div className="faq">
            <div className="title">
                <h1>FAQ</h1>
                <div className="underline-title"></div>
            </div>
            <div className="search">
                <h2>Comment pouvons-nous vous aider ?</h2>
                <div>
                    <form onSubmit={handleSubmit}>
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input 
                            type="text" 
                            name="search" 
                            value={searchWords}
                            onChange={handleSearchChange}
                            placeholder="Saisissez un ou plusieurs mots clés" 
                            className="search-field" 
                        />
                        <input type="submit" value="Rechercher" className="search-btn" />
                    </form>
                </div>
            </div>
            <div className="result">
                <div className="title">
                    <h1>Questions fréquentes</h1>
                </div>
                <div className="result-list">
                    {loading ? (
                        <p>Chargement des questions fréquentes...</p>
                    ) : faqs.length > 0 ? (
                        <FAQResults
                            results={faqs.map((faq) => (
                                <FAQResult 
                                    key={faq.id} 
                                    question={faq.question || ''} 
                                    answer={faq.answer || ''} 
                                />
                            ))}
                        />
                    ) : (
                        <p>Aucune FAQ trouvée</p>
                    )}
                </div>
            </div>
        </div>
    )
}
