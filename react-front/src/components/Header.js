import "./styles/Header.css"

import Navbar from "./Navbar"

import logoImage from "../assets/images/Logo-Odeone_blanc.png"
import { useDispatch, useSelector } from "react-redux"

const userNavTabs = [
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
        title: "CONTACT",
        ref: "contact"
    }
]

const adminNavTabs = [
    {
        title: "ACCUEIL",
        ref: "admin/accueil"
    },
    {
        title: "COMPTES UTILISATEURS",
        ref: "admin/utilisateurs"
    },
    {
        title: "FONCTIONS",
        ref: "admin/fonctions"
    },
    {
        title: "TUTORIELS",
        ref: "admin/tutoriels"
    },
    {
        title: "FAQ",
        ref: "admin/faq"
    }
]

export default function Header({ account, adminMode }) {
    const dispatch = useDispatch()

    const adminHandler = () => {
        dispatch({ type: "toggleAdminView" })
    }

    const adminView = useSelector((state) => state.admin.adminView)
    const navTabs = adminView ? adminNavTabs : userNavTabs;
    if (!adminView && adminMode)
        navTabs.push({ title: "ADMINISTRATION", ref: "admin", handler: adminHandler })

    return (
        <header>
            <div className="div-logo">
                <a className="logo-link" href="/"><img src={ logoImage } className="logo" alt="Logo Odeone" /></a>
            </div>
            <Navbar navTabs={navTabs} />
            { account }
        </header>
    )
}