import { useState, useEffect } from "react"
import { apiCreateFaq, apiEditFaq, apiRemoveFaq, apiGetFaqs } from "../../services/ApiService"

import "./styles/AdminFAQ.css"

export default function AdminFAQ() {
    const [faqs, setFaqs] = useState([])
    const [editingFaq, setEditingFaq] = useState(null)
    const [newFaq, setNewFaq] = useState({ question: "", answer: "" })

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const data = await apiGetFaqs()
                if (data) {
                    setFaqs(data)
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des FAQs:", error)
            }
        }
        fetchFaqs()
    }, [])

    // Handle editing an FAQ
    const handleEdit = async (id) => {
        try {
            const updatedFaq = await apiEditFaq(editingFaq)
            setFaqs((prevFaqs) =>
                prevFaqs.map((faq) => (faq.id === id ? updatedFaq : faq))
            )
            setEditingFaq(null)
        } catch (error) {
            console.error("Erreur lors de la modification de la FAQ:", error)
        }
    }

    // Handle removing an FAQ
    const handleRemove = async (id) => {
        try {
            await apiRemoveFaq({id})
            setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id))
        } catch (error) {
            console.error("Erreur lors de la suppression de la FAQ:", error)
        }
    }

    // Handle adding a new FAQ
    const handleAdd = async () => {
        try {
            const createdFaq = await apiCreateFaq(newFaq)
            setFaqs((prevFaqs) => [...prevFaqs, createdFaq])
            setNewFaq({ question: "", answer: "" })
        } catch (error) {
            console.error("Erreur lors de la création de la FAQ:", error)
        }
    }

    return (
        <div className="admin-faq">
            <h1>Gestionnaire de FAQ</h1>
            <div className="faq-list">
                {faqs.map((faq) => (
                    <div className="faq-item" key={faq.id}>
                        <div className="faq-details">
                            {editingFaq?.id === faq.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editingFaq.question}
                                        onChange={(e) =>
                                            setEditingFaq({
                                                ...editingFaq,
                                                question: e.target.value
                                            })
                                        }
                                        className="faq-edit-field"
                                    />
                                    <textarea
                                        value={editingFaq.answer}
                                        onChange={(e) =>
                                            setEditingFaq({
                                                ...editingFaq,
                                                answer: e.target.value
                                            })
                                        }
                                        className="faq-edit-field"
                                    />
                                    <button
                                        className="save-btn"
                                        onClick={() => handleEdit(faq.id)}
                                    >
                                        Enregistrer
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h3 className="faq-question">{faq.question}</h3>
                                    <p className="faq-answer">{faq.answer}</p>
                                </>
                            )}
                        </div>
                        <div className="faq-actions">
                            {editingFaq?.id === faq.id ? null : (
                                <>
                                    <button
                                        className="edit-btn"
                                        onClick={() => setEditingFaq(faq)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleRemove(faq.id)}
                                    >
                                        Supprimer
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="add-faq-form">
                <h3>Ajouter une FAQ</h3>
                <input
                    type="text"
                    placeholder="Question"
                    value={newFaq.question}
                    onChange={(e) =>
                        setNewFaq({ ...newFaq, question: e.target.value })
                    }
                    className="faq-add-field"
                />
                <textarea
                    placeholder="Réponse"
                    value={newFaq.answer}
                    onChange={(e) =>
                        setNewFaq({ ...newFaq, answer: e.target.value })
                    }
                    className="faq-add-field"
                />
                <button className="add-faq-btn" onClick={handleAdd}>
                    Ajouter une FAQ
                </button>
            </div>
        </div>
    )
}
