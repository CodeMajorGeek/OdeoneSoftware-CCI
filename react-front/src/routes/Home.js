import Summary from "../components/Summary"
import SummarySubContent from "../components/SummarySubContent"

import "./styles/Home.css"

import videoIntro from "../assets/videos/intro.mp4"

import videoWeighing from "../assets/videos/sums/func_weighing.mp4"
import videoAlibi from "../assets/videos/sums/mem_alibi.mp4"

import videoCounting from "../assets/videos/sums/func_counting.mp4"

export default function Home() {
    return (
        <div className="home">
            <div className="title">
                <div className="title-img">
                    <img src="/assets/images/Logo-Odeone_jaune.png" alt="Logo Odeone jaune" />
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
                        Odeone software est un logiciel de pesage développé afin de faciliter et optimiser l’ensemble de vos travaux. 
                        Ses nombreuses fonctions, dont la sauvegarde automatique de vos données, la recherche multicritère et ses 
                        options de traçabilité en font un formidable outil de travail, notamment auprès des gestionnaires, 
                        des responsables logistiques et des responsables qualités. Nous espérons que la visite de notre site web 
                        vous apportera entière satisfaction.
                    </p>
                </div>
            </div>
            <div className="summary">
                <Summary content={[
                    {
                        functionName: "Fonction Pesage",
                        subContent: [
                            {   functionName: "Fonction Pesage",
                                content: <SummarySubContent videoAsset={ videoWeighing } /> 
                            },
                            {   functionName: "Mémoire Alibi",
                                content: <SummarySubContent videoAsset={ videoAlibi } /> 
                            }
                        ]
                    },
                    {
                        functionName: "Fonction Comptage",
                        subContent: [
                            {   functionName: "Fonction Comptage", 
                                content: <SummarySubContent videoAsset={ videoCounting } /> 
                            },
                            {   functionName: "Contrôle Comptage", 
                                content: <SummarySubContent videoAsset={ videoAlibi } /> 
                            }
                        ]
                    }
                ]} />
            </div>
        </div>
    )
}