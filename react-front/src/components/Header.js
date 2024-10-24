import "./styles/Header.css"

import Navbar from "./Navbar"

export default function Header({ account }) {
    const navTabs = [
        {
            title: "ACCUEIL",
            ref: "accueil"
        },
        {
            title: "A PROPOS",
            ref: "a-propos"
        },
        {
            title: "FONCTIONS",
            ref: "fonctions"
        },
        {
            title: "DEMONSTRATION",
            ref: "demonstration"
        },
        {
            title: "TUTORIELS",
            ref: "tutoriels"
        },
        {
            title: "FAQ",
            ref: "faq"
        },
        {
            title: "BLOG",
            ref: "blog"
        },
        {
            title: "CONTACT",
            ref: "contact"
        },
    ]

    return (
        <header>
            <div className="div-logo">
                <a className="logo-link" href="/"><img src="/assets/images/Logo-Odeone_blanc.png" className="logo" alt="Logo Odeone" /></a>
            </div>
            <Navbar navTabs={navTabs} />
            { account }
        </header>
    )
}