import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faEnvelope, faMobileAlt, faPhone } from "@fortawesome/free-solid-svg-icons"

import "./styles/Footer.css"

export default function Footer() {
    return (
        <footer>
            <ul>
                <li><FontAwesomeIcon icon={ faHome } /> 67700 MONSWILLER</li>
                <li><FontAwesomeIcon icon={ faEnvelope } /> contact@odeone-software.com</li>
                <li><FontAwesomeIcon icon={ faMobileAlt } /> 06 74 79 36 64</li>
                <li><FontAwesomeIcon icon={ faPhone } /> 03 88 04 20 20</li>
            </ul>
            <p><a href="/">odeone-software.com</a> distribué par 67 Pesage.</p>
        </footer>
    )
}