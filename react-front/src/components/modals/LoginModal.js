import "./styles/LoginModal.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { apiLogin } from "../../services/ApiService"

export default function LoginModal() {
    const [formData, setFormData] = useState({
        email: "",
        pass: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await apiLogin(formData.email, formData.pass)
            alert("Connexion réussie !")
        } catch (error) {
            console.error("Erreur :", error.message)
            alert("Échec de la connexion. Vérifiez vos informations.")
        }
    }

    return (
        <div className="login-modal">
            <h1>CONNEXION <FontAwesomeIcon icon={faSignInAlt} /></h1>
            <form className="form login-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Adresse mail <span className="req-field">*</span></label>
                    <input
                        type="email"
                        placeholder="Entrer l'adresse Mail"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="pass">Mot de passe <span className="req-field">*</span></label>
                    <input
                        type="password"
                        placeholder="Entrer le mot de passe"
                        id="pass"
                        name="pass"
                        value={formData.pass}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input type="submit" value="CONNEXION" className="submit-btn" />
                </div>
            </form>
        </div>
    )
}
