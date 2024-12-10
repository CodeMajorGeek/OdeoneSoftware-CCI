import "./styles/About.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

import logoImage from "../assets/images/icone-Odeone_jaune.png"

export default function About() {
    return (
        <div className="about">
            <div className="title">
                <h1>A PROPOS</h1>
                <div className="underline-title"></div>
            </div>
            <div>
                <h2>Pourquoi avoir développé ODEONE SOFTWARE ?</h2>
            </div>
            <div className="p-first">
                <p>
                    Après avoir travaillé de nombreuses années dans le domaine du pesage et avoir pu recueillir les retours
                    de nos clients, nous en sommes finalement venus au constat suivant : il faut plus de simplicité.
                    De ce constat est né en 2019 <b className="b-bold">ODEONE SOFTWARE</b>.
                    Grâce à ce logiciel vos balances s’intègrent désormais à votre ordinateur.
                    Votre écran d’ordinateur devient votre seule interface d’utilisation.
                    Gagnez ainsi en temps, en énergie et surtout, en efficacité. Ce logiciel vous offre en outre :
                </p>
            </div>
            <div className="check-list">
                <div>
                    <ul>
                        <li>
                            <p>
                                <span className="s-icon"><FontAwesomeIcon icon={faCheck} className="f-icon" /></span>
                                Une meilleur qualité d'écran.
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="s-icon"><FontAwesomeIcon icon={faCheck} className="f-icon" /></span>
                                Une meilleure puissance de calcul.
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="s-icon"><FontAwesomeIcon icon={faCheck} className="f-icon" /></span>
                                Une connexion multi-périphériques facilitée (balances, scanners, imprimantes).
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="s-icon"><FontAwesomeIcon icon={faCheck} className="f-icon" /></span>
                                Un choix d'équipements multimarques.
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="s-icon"><FontAwesomeIcon icon={faCheck} className="f-icon" /></span>
                                Une personnalisation de vos étiquettes, états, QR-codes et codes-barres.
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="s-icon"><FontAwesomeIcon icon={faCheck} className="f-icon" /></span>
                                Une connexion à des postes de pesées en réseau et leurs supervisions.
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="s-icon"><FontAwesomeIcon icon={faCheck} className="f-icon" /></span>
                                Une sécurité de vos droits de gestion (administrateur, opérateur...).
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="s-icon"><FontAwesomeIcon icon={faCheck} className="f-icon" /></span>
                                Une traçabilité de vos opérations.
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="s-icon"><FontAwesomeIcon icon={faCheck} className="f-icon" /></span> 
                                Une sauvegarde automatique de vos données.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="desc">
                <div className="icon">
                    <img src={ logoImage } alt="Icon Odeone jaune" />
                </div>
                <div className="p-desc">
                    <p>
                        <b className="p-bold">ODEONE SOFTWARE</b> est un logiciel standard et accessible.
                    </p>
                    <p>
                        <b className="p-bold">ODEONE SOFTWARE</b> est capable de se connecter jusqu’à trois
                        balances différentes par poste quelles que soient leurs étendues de mesure et leurs résolutions.
                    </p>
                    <p>
                        Il n’est plus nécessaire d'opérer sur vos balances.
                        Toutes les commandes et lectures se font désormais sur votre écran de l'ordinateur.
                    </p>
                    <p>
                        <b className="p-bold">ODEONE SOFTWARE</b> offre à ce jour différentes fonctions dans le domaine du pesage
                        conçues à partir des demandes clients les plus fréquentes.
                    </p>
                </div>
            </div>
            <div className="p-last">
                <p>
                    Notre logiciel est évolutif. D'autres fonctions sont à venir. 
                    N’hésitez pas à nous contacter si vous nécessitez une amélioration spécifique de notre logiciel pour votre entreprise. 
                    Notre équipe sera ravie de vous accompagner et adapter <b className="b-bold">ODEONE SOFTWARE</b> à vos besoins.
                </p>
            </div>
        </div>
    )
}