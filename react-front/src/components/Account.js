import { useDispatch } from "react-redux"
import "./styles/Account.css"


export default function Account() {
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