import "./styles/LoginModal.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"

export default function LoginModal() {
    return (
        <div className="login-modal">
            <h1>CONNEXION <FontAwesomeIcon icon={ faSignInAlt } /></h1>
            <form className="form login-form" method="POST">
                <div>
                    <label for="email">adresse mail <span className="req-field">*</span></label>
                    <input type="email" placeholder="Entrer l'adresse Mail" id="email" name="email" required />
                </div>
                <div>
                    <label for="email">mot de passe <span className="req-field">*</span></label>
                    <input type="password" placeholder="Entrer le mot de passe" id="pass" name="pass" required />
                </div>
                <div>
                    <input type="submit" value="CONNEXION" className="submit-btn" />
                </div>
            </form>
        </div>
    )
}