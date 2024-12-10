import "./styles/RegisterModal.css"

import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RegisterModal() {
    return (
        <div className="register-modal">
            <h1>INSCRIPTION <FontAwesomeIcon icon={ faUserEdit } /></h1>
            <form className="form register-form" method="PUT">
                <div>
                    <label for="lastname">NOM <span className="req-field">*</span></label>
                    <input type="text" placeholder="Entrer votre nom" id="lastname" name="lastname" required />
                </div>
                <div>
                    <label for="firstname">Prénom <span className="req-field">*</span></label>
                    <input type="text" placeholder="Entrer votre prénom" id="firstname" name="firstname" required />
                </div>
                <div>
                    <label for="first-email">adresse mail principale <span className="req-field">*</span></label>
                    <input type="email" placeholder="Entrer votre adresse mail principale" id="first-email" name="first-email" required />
                </div>
                <div>
                    <label for="second-email">adresse mail secondaire</label>
                    <input type="email" placeholder="Entrer votre adresse mail secondaire" id="second-email" name="second-email" />
                </div>
                <div>
                    <label for="company">nom de la sociétée <span className="req-field">*</span></label>
                    <input type="text" placeholder="Entrer le nom de votre sociétée" id="company" name="company" required />
                </div>
                <div>
                    <label for="tel">numéro de téléphone <span className="req-field">*</span></label>
                    <input type="tel" placeholder="Entrer votre numéro de téléphone" id="tel" name="tel" required />
                </div>
                <div>
                    <label for="password">mot de passe <span className="req-field">*</span></label>
                    <input type="password" placeholder="Entrer votre mot de passe" id="password" name="password" required />
                </div>
                <div>
                    <label for="password-confirm">confirmation du mot de passe <span className="req-field">*</span></label>
                    <input type="password" placeholder="Confirmer votre mot de passe" id="password-confirm" name="password-confirm" required />
                </div>
                <div>
                    <label for="gender">civilité</label>
                    <select name="gender" id="gender">
                        <option value="not-specified">Non précisé</option>
                        <option value="male">Monsieur</option>
                        <option value="female">Madame</option>
                    </select>
                </div>
                <div className="d-cgu">
                    <input type="checkbox" id="cgu" name="cgu" required />
                    <label for="cgu">J'accepte les termes et les contrats d'usages. <span className="req-field">*</span></label>
                </div>
                <div>
                    <input type="submit" value="CONNEXION" className="submit-btn" />
                </div>
            </form>
        </div>
    )
}