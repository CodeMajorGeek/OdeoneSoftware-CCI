import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { apiGetFaqs } from "../services/ApiService";

import FAQResults from "../components/FAQResults";
import FAQResult from "../components/FAQResult";

import "./styles/FAQ.css";

export default function FAQ() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Appel à l'API pour récupérer les FAQs
    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const data = await apiGetFaqs();
                setFaqs(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des FAQs :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    return (
        <div className="faq">
            <div className="title">
                <h1>FAQ</h1>
                <div className="underline-title"></div>
            </div>
            <div className="search">
                <h2>Comment pouvons-nous vous aider ?</h2>
                <div>
                    <form method="GET">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input type="text" name="search" placeholder="Saisissez un ou plusieurs mots clés" className="search-field" />
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
                    ) : (
                        <FAQResults
                            results={faqs.map((faq) => (
                                <FAQResult key={faq.id} question={faq.question} answer={faq.answer} />
                            ))}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
