import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import { faUserEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { apiUpdateUser, apiGetUser, apiDeleteOwnUser } from "../../services/ApiService"

import "./styles/UpdateUserModal.css"

export default function UpdateUserModal() {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        lastname: "",
        firstname: "",
        firstEmail: "",
        secondEmail: "",
        company: "",
        tel: "",
        password: "",
        passwordConfirm: "",
        gender: "not-specified"
    })

    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await apiGetUser()
                if (userData) {
                    setFormData({
                        lastname: userData.lastname || "",
                        firstname: userData.firstname || "",
                        firstEmail: userData.main_email || "",
                        secondEmail: userData.second_email || "",
                        company: userData.company || "",
                        tel: userData.telephone || "",
                        password: "",
                        passwordConfirm: "",
                        gender: userData.gender || "not-specified"
                    })
                }
            } catch (err) {
                setError("Erreur lors de la récupération des données utilisateur")
            }
        }
        
        fetchUserData()
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Vérification du mot de passe uniquement si un nouveau mot de passe est saisi
        if (formData.password) {
            if (!formData.passwordConfirm) {
                setError("Veuillez confirmer votre nouveau mot de passe.")
                return
            }
            if (formData.password !== formData.passwordConfirm) {
                setError("Les mots de passe ne correspondent pas.")
                return
            }
        }

        try {
            await apiUpdateUser({
                firstname: formData.firstname,
                lastname: formData.lastname,
                main_email: formData.firstEmail,
                second_email: formData.secondEmail,
                company: formData.company,
                telephone: formData.tel,
                password: formData.password || undefined,
                gender: formData.gender
            })

            setError(null)
            dispatch({ type: "closeModal" })
        } catch (err) {
            setError(err.message)
        }
    }

    const handleDeleteAccount = async () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
            try {
                await apiDeleteOwnUser()
                dispatch({ type: "resetAuthentification" })
                dispatch({ type: "closeModal" })
            } catch (err) {
                setError("Erreur lors de la suppression du compte : " + err.message)
            }
        }
    }

    return (
        <div className="update-user-modal">
            <h1>
                MODIFIER MON PROFIL <FontAwesomeIcon icon={faUserEdit} />
            </h1>
            <form className="form update-user-form" onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                <div>
                    <label htmlFor="lastname">NOM</label>
                    <input
                        type="text"
                        placeholder="Entrer votre nom"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="firstname">Prénom</label>
                    <input
                        type="text"
                        placeholder="Entrer votre prénom"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="firstEmail">adresse mail principale</label>
                    <input
                        type="email"
                        placeholder="Entrer votre adresse mail principale"
                        id="firstEmail"
                        name="firstEmail"
                        value={formData.firstEmail}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="secondEmail">adresse mail secondaire</label>
                    <input
                        type="email"
                        placeholder="Entrer votre adresse mail secondaire"
                        id="secondEmail"
                        name="secondEmail"
                        value={formData.secondEmail}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="company">nom de la société</label>
                    <input
                        type="text"
                        placeholder="Entrer le nom de votre société"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="tel">numéro de téléphone</label>
                    <input
                        type="tel"
                        placeholder="Entrer votre numéro de téléphone"
                        id="tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">nouveau mot de passe (optionnel)</label>
                    <input
                        type="password"
                        placeholder="Entrer votre nouveau mot de passe"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="passwordConfirm">confirmation du nouveau mot de passe</label>
                    <input
                        type="password"
                        placeholder="Confirmer votre nouveau mot de passe"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="gender">civilité</label>
                    <select
                        name="gender"
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="not-specified">Non précisé</option>
                        <option value="male">Monsieur</option>
                        <option value="female">Madame</option>
                    </select>
                </div>
                <div className="form-actions">
                    <input type="submit" value="ENREGISTRER" className="submit-btn" />
                    <button 
                        type="button" 
                        className="delete-account-btn"
                        onClick={handleDeleteAccount}
                    >
                        <FontAwesomeIcon icon={faTrash} /> SUPPRIMER MON COMPTE
                    </button>
                </div>
            </form>
        </div>
    )
}
