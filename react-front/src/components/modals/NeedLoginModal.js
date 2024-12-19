import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useDispatch } from "react-redux"

import "./styles/NeedLoginModal.css"

export default function NeedLoginModal() {
    const dispatch = useDispatch()

    const gobackHandler = () => {
        dispatch({ type: "closeModal" })
    }

    return (
        <div className="need-login-modal">
            <h1>CONNEXION REQUISE <FontAwesomeIcon icon={faPaperPlane} className="paper-icon" /></h1>
            <p>
                Vous n'avez pas accès à cette partie.<br />
                Pour y avoir accès, merci de bien vouloir vous inscrire ou de vous connecter.
            </p>
            <button onClick={gobackHandler} className="submit-btn">CONTINUER LA VISITE</button>
        </div>
    )
}