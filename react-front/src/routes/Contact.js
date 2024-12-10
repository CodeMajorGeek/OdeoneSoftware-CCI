import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faEnvelope, faMobileAlt, faPhone } from "@fortawesome/free-solid-svg-icons"

import "./styles/Contact.css"

import logoImage from "../assets/images/Logo-Odeone_jaune.png"

export default function Contact() {
    return (
        <div className="contact">
            <div className="title">
                <div className="title-img">
                    <img src={ logoImage } alt="Logo Odeone jaune" />
                </div>
                <h1>CONTACT</h1>
                <div className="underline-title"></div>
            </div>
            <div className="info">
                <h2>Vous avez besoin d'informations concernant Odeone Software ?<br />Contactez-nous.</h2>
                <div>
                    <ul>
                        <li><FontAwesomeIcon icon={ faHome } className="icon" /> 67700 MONSVILLER</li>
                        <li><FontAwesomeIcon icon={ faMobileAlt } className="icon" /> 06 74 79 36 34</li>
                        <li><FontAwesomeIcon icon={ faPhone } className="icon" /> 03 88 04 20 20</li>
                        <li><FontAwesomeIcon icon={ faEnvelope } className="icon" /> contact@odeone-software.com</li>
                    </ul>
                </div>
            </div>
            <div className="form-box">
                <form method="POST">
                    <div>
                        <label for="object">Objet</label>
                        <input type="text" placeholder="Objet de votre requête" id="object" name="object" required />
                    </div>
                    <div>
                        <label for="message">Message</label>
                        <textarea placeholder="Saisissez votre message"
                            id="message" name="message" rows={9} required></textarea>
                    </div>
                    <div className="d-submit">
                        <input type="submit" value="Envoyer" className="submit-btn" />
                    </div>
                </form>
            </div>
        </div>
    )
}