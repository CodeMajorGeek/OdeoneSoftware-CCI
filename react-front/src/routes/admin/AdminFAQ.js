import "./styles/AdminFAQ.css"

export default function AdminFAQ() {
    // Données extraites pour traitement futur avec une API REST
    const faqData = [
        {
            question: "Sur quel système d'exploitation fonctionne le logiciel ?",
            answer: "Sous Windows en 32 ou 64 bits. (Le 64 bits est à privilégier)."
        },
        {
            question: "Le logiciel est-il compatible avec toutes les balances du marché ?",
            answer: "Non, la balance doit être équipée d'au moins une sortie RS232/USB/Ethernet. Il est également nécessaire que le constructeur mette à disposition la notice du protocole de communication."
        }
    ]

    return (
        <div className="admin-faq">
            <h1>Gestionnaire de FAQ</h1>
            <div className="faq-list">
                {faqData.map((faq, index) => (
                    <div className="faq-item" key={index}>
                        <div className="faq-details">
                            <h3 className="faq-question">{faq.question}</h3>
                            <p className="faq-answer">{faq.answer}</p>
                        </div>
                        <div className="faq-actions">
                            <button className="edit-btn">Modifier</button>
                            <button className="delete-btn">Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="add-faq-btn">Ajouter une FAQ</button>
        </div>
    )
}
