import "./styles/Account.css"

export default function Account({ setShowLoginModal, setShowRegisterModal }) {

    const loginHandler = (e) => {
        setShowLoginModal(true)
    }

    const registerHandler = (e) => {
        setShowRegisterModal(true)
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