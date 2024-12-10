import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt, faEdit, faArrowUp, faArrowDown, faPlus } from "@fortawesome/free-solid-svg-icons"
import "./styles/AdminTutos.css"

export default function AdminTutos() {
    const carousels = [
        {
            id: "weighing",
            title: "Fonction PESAGE",
            slides: [
                { id: 1, type: "VIDEO", assetPath: "/assets/videos/vid1.mp4", title: "tuto1" },
                { id: 2, type: "VIDEO", assetPath: "/assets/videos/vid2.mp4", title: "tuto2" }
            ]
        },
        {
            id: "counting",
            title: "Fonction COMPTAGE",
            slides: [
                { id: 1, type: "VIDEO", assetPath: "/assets/videos/vid1.mp4", title: "tuto1" },
                { id: 2, type: "VIDEO", assetPath: "/assets/videos/vid2.mp4", title: "tuto2" },
                { id: 3, type: "IMAGE", assetPath: "/assets/images/img1.png", title: "image1" },
                { id: 4, type: "IMAGE", assetPath: "/assets/images/img2.png", title: "image2" },
                { id: 5, type: "VIDEO", assetPath: "/assets/videos/vid3.mp4", title: "tuto3" }
            ]
        }
    ]

    return (
        <div className="admin-tutos">
            <h1>Gestionnaire de tutoriels</h1>
            {carousels.map(carousel => (
                <div key={carousel.id} className="carousel-admin">
                    <h2>{carousel.title}</h2>
                    <ul>
                        {carousel.slides.map((slide, index) => (
                            <li key={slide.id} className="slide-item">
                                <span>{slide.title}</span>
                                <FontAwesomeIcon icon={faEdit} className="action-icon" title="Modifier" />
                                <FontAwesomeIcon icon={faTrashAlt} className="action-icon" title="Supprimer" />
                                {index > 0 && (
                                    <FontAwesomeIcon icon={faArrowUp} className="action-icon" title="Monter" />
                                )}
                                {index < carousel.slides.length - 1 && (
                                    <FontAwesomeIcon icon={faArrowDown} className="action-icon" title="Descendre" />
                                )}
                            </li>
                        ))}
                    </ul>
                    <button className="add-btn">
                        <FontAwesomeIcon icon={faPlus} /> Ajouter un élément
                    </button>
                </div>
            ))}
        </div>
    )
}
