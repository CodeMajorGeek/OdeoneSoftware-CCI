import React, { useState, useEffect } from "react"
import Summary from "../components/Summary"
import SummarySubContent from "../components/SummarySubContent"
import { apiGetAllSummaries } from "../services/ApiService"

import "./styles/Home.css"

import videoIntro from "../assets/videos/intro.mp4"

import logoImage from "../assets/images/Logo-Odeone_jaune.png"

export default function Home() {
    const [summaries, setSummaries] = useState([])

    useEffect(() => {
        loadSummaries()
    }, [])

    const loadSummaries = async () => {
        try {
            const data = await apiGetAllSummaries()
            if (data && Array.isArray(data) && data.length > 0) {
                const formattedData = data.map(item => ({
                    functionName: item.functionName,
                    subContent: item.subContent ? item.subContent.map(sub => ({
                        functionName: sub.functionName,
                        content: sub.videoPath && (
                            <SummarySubContent 
                                videoAsset={`${window.location.protocol}//${window.location.hostname}/api/v1/${sub.videoPath}`} 
                            />
                        )
                    })) : []
                }))
                console.log("Données formatées:", formattedData)
                setSummaries(formattedData)
            } else {
                setSummaries([])
            }
        } catch (error) {
            console.error("Erreur lors du chargement des sommaires:", error)
            setSummaries([])
        }
    }

    return (
        <div className="home">
            <div className="title">
                <div className="title-img">
                    <img src={ logoImage } alt="Logo Odeone jaune" />
                </div>
            </div>
            <div className="main-vid">
                <div>
                    <div className="vid-bar"></div>
                    <video className="vid-player" controls>
                        <source src={ videoIntro } type="video/mp4" />
                    </video>
                    <div className="vid-bar"></div>
                </div>
                <div className="description">
                    <p>
                        Odeone software est un logiciel de pesage développé afin de faciliter et optimiser l'ensemble de vos travaux. 
                        Ses nombreuses fonctions, dont la sauvegarde automatique de vos données, la recherche multicritère et ses 
                        options de traçabilité en font un formidable outil de travail, notamment auprès des gestionnaires, 
                        des responsables logistiques et des responsables qualités. Nous espérons que la visite de notre site web 
                        vous apportera entière satisfaction.
                    </p>
                </div>
            </div>
            <div className="summary">
                <Summary content={summaries} />
            </div>
        </div>
    )
}