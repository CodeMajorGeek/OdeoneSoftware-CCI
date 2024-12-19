import "./styles/Header.css"

import Navbar from "./Navbar"
import Account from "./Account"

import logoImage from "../assets/images/Logo-Odeone_blanc.png"
import { useDispatch, useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { useMemo } from "react"

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

export default function Header() {
    const dispatch = useDispatch()

    const adminHandler = () => {
        dispatch({ type: "toggleAdminView" })
    }

    const adminView = useSelector((state) => state.account.adminView)
    const adminMode = useSelector((state) => state.account.adminMode)

    const navTabs = useMemo(() => {
        const tabs = adminView ? adminNavTabs : userNavTabs.slice();
        if (!adminView && adminMode) {
            tabs.push({ title: "ADMINISTRATION", ref: "admin", handler: adminHandler });
        }
        return tabs;
    }, [adminView, adminMode])

    return (
        <header>
            <div className="div-logo">
                <a className="logo-link" href="/"><img src={logoImage} className="logo" alt="Logo Odeone" /></a>
            </div>
            <Navbar navTabs={navTabs} />
            <Account />
        </header>
    )
}