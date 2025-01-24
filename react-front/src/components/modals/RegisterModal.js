import React, { useState } from "react"
import { useDispatch } from "react-redux"
import "./styles/RegisterModal.css"
import { faUserEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { apiRegister } from "../../services/ApiService"


export default function RegisterModal() {
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.passwordConfirm) {
            setError("Les mots de passe ne correspondent pas.")
            return
        }

        try {
            apiRegister(
                formData.firstname,
                formData.lastname,
                formData.firstEmail,
                formData.secondEmail,
                formData.company,
                formData.tel,
                formData.password,
                formData.gender)

            setError(null)
            setFormData({
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
            
            dispatch({ type: "showLoginModal" })
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="register-modal">
            <h1>
                INSCRIPTION <FontAwesomeIcon icon={faUserEdit} />
            </h1>
            <form className="form register-form" onSubmit={handleSubmit}>
                {error && <p className="error">{error.message}</p>}
                <div>
                    <label htmlFor="lastname">
                        NOM <span className="req-field">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Entrer votre nom"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="firstname">
                        Prénom <span className="req-field">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Entrer votre prénom"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="firstEmail">
                        adresse mail principale <span className="req-field">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Entrer votre adresse mail principale"
                        id="firstEmail"
                        name="firstEmail"
                        value={formData.firstEmail}
                        onChange={handleChange}
                        required
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
                    <label htmlFor="company">
                        nom de la société <span className="req-field">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Entrer le nom de votre société"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="tel">
                        numéro de téléphone <span className="req-field">*</span>
                    </label>
                    <input
                        type="tel"
                        placeholder="Entrer votre numéro de téléphone"
                        id="tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        mot de passe <span className="req-field">*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Entrer votre mot de passe"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="passwordConfirm">
                        confirmation du mot de passe <span className="req-field">*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Confirmer votre mot de passe"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        required
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
                <div>
                    <input type="submit" value="INSCRIPTION" className="submit-btn" />
                </div>
            </form>
        </div>
    )
}
