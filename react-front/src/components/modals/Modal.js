import "./styles/Modal.css"

import logoImage from "../../assets/images/Logo-Odeone_jaune.png"
import { useDispatch } from "react-redux"

export default function Modal({ show, modalContent }) {   
    const dispatch = useDispatch()
    
    const closeHandler = (e) => {
        dispatch({ type: "closeModal" })
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