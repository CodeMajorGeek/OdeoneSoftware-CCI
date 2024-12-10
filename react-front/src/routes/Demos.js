import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserFriends, faHdd, faQuestion, faAward, faHandshake } from "@fortawesome/free-solid-svg-icons"

import "./styles/Demos.css"

import logoImage from "../assets/images/Logo-Odeone_jaune.png"

export default function Demos() {
    return (
        <div className="demos">
            <div className="title">
                <div className="title-img">
                    <img src={ logoImage } alt="Logo Odeone jaune" />
                </div>
                <h1>DEMONSTRATION</h1>
                <div className="underline-title"></div>
                <h2>DISTANCIEL OU PHYSIQUE</h2>
            </div>
            <div>
                <div className="why">
                    <h1>Pourquoi suivre une démonstration ?</h1>
                    <div>
                        <ul>
                            <li><FontAwesomeIcon icon={ faUserFriends } className="f-icon" /> Faire connaissance</li>
                            <li><FontAwesomeIcon icon={ faHdd } className="f-icon" /> Découvrir l'étendue des possibilités proposées par notre logiciel</li>
                            <li><FontAwesomeIcon icon={ faQuestion } className="f-icon" /> Avoir des réponses à vos interrogations</li>
                            <li><FontAwesomeIcon icon={ faAward } className="f-icon" /> Partager nos connaissances</li>
                            <li><FontAwesomeIcon icon={ faHandshake } className="f-icon" /> être guidé</li>
                        </ul>
                    </div>
                </div>
                <div className="who">
                    <h1>Comment suivre une démonstration</h1>
                    <h2>En faire la demande</h2>
                    <div>
                        <ul>
                            <li>Remplissez le formulaire ci-dessous.</li>
                            <li>Nous vous contacterons pour programmer une session ensemble.</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="form-box">
                        <h1>Formulaire de demande de demonstration</h1>
                        <form method="POST">
                            <div>
                                <label for="type">Type</label>
                                <select name="type" id="type">
                                    <option value="dist">Distanciel</option>
                                    <option value="phys">Physique</option>
                                </select>
                            </div>
                            <div>
                                <label for="func">Fonctionnalité</label>
                                <select name="func" id="func">
                                    <option value="weighing">Fonction PESAGE</option>
                                    <option value="counting">Fonction COMPTAGE</option>
                                    <option value="dev">En développement</option>
                                    <option value="globl">Globale</option>
                                </select>
                            </div>
                            <div>
                                <label for="message">Message</label>
                                <textarea placeholder="Saisissez votre message" id="message" name="message" rows={9} required />
                            </div>
                            <div className="d-submit">
                                <input type="submit" value="Envoyer" className="submit-btn" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}