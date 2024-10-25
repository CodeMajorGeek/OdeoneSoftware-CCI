
import "./styles/CarouselSlide.css"

export function CarouselSlide({ type, assetPath, title }) {
    if (type === "IMAGE")
        return (<img src={ assetPath } alt={ title } />)
    else if (type === "VIDEO") {
        const videoType = assetPath.substr(assetPath.lastIndexOf('.') + 1)

        return (
        <video key={ assetPath } controls>
            <source src={ assetPath } type={ "video/" + videoType } />
        </video>
        )
    }
}