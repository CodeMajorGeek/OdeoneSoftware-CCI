import "./styles/Modal.css"

export default function Modal({ show, setShow, modalContent }) {   
    const closeHandler = (e) => {
        setShow(false)
    }
    
    if (show) {
        return (
            <div className="modal">
                <img src="/assets/images/Logo-Odeone_jaune.png" alt="Logo Odeone jaune" />
                <div className="modal-content">
                    <button onClick={ closeHandler } className="close-btn">X</button>
                    { modalContent }
                </div>
            </div>
        )
    }
    
    return null
}