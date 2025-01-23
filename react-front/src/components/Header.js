import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"

import Navbar from "./Navbar"
import Account from "./Account"

import logoImage from "../assets/images/Logo-Odeone_blanc.png"

import "./styles/Header.css"

const userNavTabs = [
    {
        title: "ACCUEIL",
        ref: "accueil",
        needLogin: false
    },
    {
        title: "A PROPOS",
        ref: "a-propos",
        needLogin: false
    },
    {
        title: "FONCTIONS",
        ref: "fonctions",
        needLogin: false
    },
    {
        title: "DEMONSTRATION",
        ref: "demonstration",
        needLogin: true
    },
    // {
    //     title: "TUTORIELS",
    //     ref: "tutoriels",
    //     needLogin: true
    // },
    {
        title: "FAQ",
        ref: "faq",
        needLogin: false
    },
    {
        title: "CONTACT",
        ref: "contact",
        needLogin: true
    }
]

const adminNavTabs = [
    {
        title: "ACCUEIL",
        ref: "admin/accueil",
        needLogin: true
    },
    {
        title: "COMPTES UTILISATEURS",
        ref: "admin/utilisateurs",
        needLogin: true
    },
    {
        title: "FONCTIONS",
        ref: "admin/fonctions",
        needLogin: true
    },
    // {
    //     title: "TUTORIELS",
    //     ref: "admin/tutoriels",
    //     needLogin: true
    // },
    {
        title: "FAQ",
        ref: "admin/faq",
        needLogin: true
    }
]

export default function Header() {
    const dispatch = useDispatch()

    const adminView = useSelector((state) => state.account.adminView)
    const adminMode = useSelector((state) => state.account.adminMode)

    const navTabs = useMemo(() => {
        const adminHandler = () => {
            dispatch({ type: "toggleAdminView" })
        }

        const tabs = adminView ? adminNavTabs : userNavTabs.slice();
        if (!adminView && adminMode) {
            tabs.push({ title: "ADMINISTRATION", ref: "admin", handler: adminHandler, needLogin: true });
        }
        return tabs;
    }, [adminView, adminMode, dispatch])

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