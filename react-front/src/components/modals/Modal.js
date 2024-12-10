import "./styles/Modal.css"

import logoImage from "../../assets/images/Logo-Odeone_jaune.png"

export default function Modal({ show, setShow, modalContent }) {   
    const closeHandler = (e) => {
        setShow(false)
    }
    
    if (show) {
        return (
            <div className="modal">
                <img src={ logoImage } alt="Logo Odeone jaune" />
                <div className="modal-content">
                    <button onClick={ closeHandler } className="close-btn">X</button>
                    { modalContent }
                </div>
            </div>
        )
    }
    
    return null
}