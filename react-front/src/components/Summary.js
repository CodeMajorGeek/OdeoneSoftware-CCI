import { useState } from "react"

import "./styles/Summary.css"

export default function Summary({ content }) {
    const [currentContent, setCurrentContent] = useState(content)
    const [selectedVideo, setSelectedVideo] = useState(content[0].subContent[0].content)

    const summaryEntryHandler = (item) => {
        if (item.subContent)
            setCurrentContent(item.subContent)
        else if (item.content) {
            setSelectedVideo(item.content)
            setCurrentContent(content)
        }
    }

    const handleBack = () => {
        setCurrentContent(content)
    }

    return (
        <>
            <div className="summary">
                <div className="select">
                    <ul>
                        {
                        currentContent.map((item, index) => (
                            <li key={index}>
                                <button onClick={() => summaryEntryHandler(item)}>
                                    {item.functionName}
                                </button>
                            </li>
                        ))
                        }
                        {currentContent !== content && (
                            <li key={ content }>
                                <button className="back-button" onClick={handleBack}>Retour</button>
                            </li>
                            )}
                    </ul>
                </div>
            </div>
            <div className="video-section">
                { selectedVideo }
            </div>
        </>
    )
}