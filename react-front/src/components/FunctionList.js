
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./styles/FunctionList.css"
import { faCheck, faChevronCircleDown } from "@fortawesome/free-solid-svg-icons"

export default function FunctionList({ title, features }) {
    return (
        <div className="func-list">
            <div className="title">
                <h3>{ title }</h3>
                <FontAwesomeIcon icon={ faChevronCircleDown } className="f-icon" />
            </div>
            <div className="features">
                <ul>
                    { features.map((el, i) => <li key={i}><FontAwesomeIcon icon={ faCheck } className="f-icon" /> { el }</li>) }
                </ul>
                <div className="d-quot">
                    <button className="quot-btn">Demander un devis</button>
                </div>
            </div>
        </div>
    )
}