import { useDispatch, useSelector } from "react-redux"
import { apiLogout } from "../services/ApiService"

import "./styles/Account.css"

function UnauthentifiedAccount() {
    const dispatch = useDispatch()

    const loginHandler = (e) => {
        dispatch({ type: "showLoginModal" })
    }

    const registerHandler = (e) => {
        dispatch({ type: "showRegisterModal" })
    }

    return (
        <div className="account">
            <ul>
                <li>
                    <button onClick={ loginHandler }>CONNEXION</button>
                </li>
                <li>
                    <button onClick={ registerHandler }>INSCRIPTION</button>
                </li>
            </ul>
        </div>
    )
}

function AuthentifiedAccount() {
    const dispatch = useDispatch()

    const logoutHandler = (e) => {
        apiLogout()
        dispatch({
            type: "resetAuthentification"
        })
    }

    const updateUserHandler = (e) => {
        dispatch({ type: "showUpdateUserModal" })
    }

    return (
        <div className="account">
            <ul>
                <li>
                    <button onClick={ logoutHandler }>DECONNEXION</button>
                </li>
                <li>
                    <button onClick={ updateUserHandler }>MODIFIER PROFIL</button>
                </li>
            </ul>
        </div>
    )
}

export default function Account() {
    const authentified = useSelector((state) => state.account.authMode)
    return authentified ? <AuthentifiedAccount /> : <UnauthentifiedAccount />
}