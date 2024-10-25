import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

import "./styles/Carousel.css"

export default function Carousel({ slides }) {
    const [slideIndex, setSlideIndex] = useState(0)

    const lastBtnHandler = (e) => {
        const newIndex = slideIndex - 1;
        setSlideIndex(newIndex <= -1 ? (slides.length - 1) : newIndex);
    }

    const nextBtnHandler = (e) => {
        const newIndex = slideIndex + 1;
        setSlideIndex(newIndex > slides.length - 1 ? 0 : newIndex);
    }

    return (
        <div className="carousel">
            <div>
                <div className="slide">
                    { slides[slideIndex] }
                </div>
                <button className="prev-btn btn" onClick={ lastBtnHandler }><FontAwesomeIcon icon={ faArrowAltCircleLeft }/></button>
                <button className="next-btn btn" onClick={ nextBtnHandler }><FontAwesomeIcon icon={ faArrowAltCircleRight }/></button>
            </div>
        </div>
    )
}