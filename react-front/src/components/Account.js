import { useDispatch, useSelector } from "react-redux"
import "./styles/Account.css"

import { apiLogout } from "../services/ApiService"

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

    return (
        <div className="account">
        <ul>
            <li>
                <button onClick={ logoutHandler }>DECONNEXION</button>
            </li>
        </ul>
    </div>
    )
}

export default function Account() {
    const authentified = useSelector((state) => state.account.authMode)
    return authentified ? <AuthentifiedAccount /> : <UnauthentifiedAccount />
}