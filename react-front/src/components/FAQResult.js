import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

import "./styles/FAQResult.css"

function FAQAnswer({ shouldShow, answer }) {

    if (shouldShow) {
        return (
            <div className="answer">
                <p>{ answer }</p>
            </div>
        )
    }
    return null
}

export default function FAQResult({ question, answer }) {
    const [shouldShow, setShouldShow] = useState(false)

    const questionHandler = (e) => {
        setShouldShow(!shouldShow)
    }

    return (
        <div className="result-item">
            <button onClick={ questionHandler } className="question">
                <span className="s-icon"><FontAwesomeIcon icon={ faQuestionCircle } /></span>
                { question }
            </button>
            <FAQAnswer shouldShow={ shouldShow } answer={ answer } />
        </div>
    )
}