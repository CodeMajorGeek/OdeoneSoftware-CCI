import Carousel from "../components/Carousel"
import { CarouselSlide } from "../components/CarouselSlide"

import vid1 from "../assets/videos/tutos/tuto1.mp4" 
import vid2 from "../assets/videos/tutos/tuto2.mp4" 
import vid3 from "../assets/videos/tutos/tuto3.mp4" 

import "./styles/Tutos.css"

export default function Tutos() {
    return (
        <div className="tutos">
            <div className="title">
                <h1>TUTORIELS</h1>
                <div className="underline-title"></div>
            </div>
            <div className="weighing">
                <h2>Fonction PESAGE</h2>
                <Carousel slides={[
                    <CarouselSlide type="VIDEO"  assetPath={ vid1 } title="tuto1"/>,
                    <CarouselSlide type="VIDEO"  assetPath={ vid1 } title="tuto2"/>
                ]} />
            </div>
            <div className="counting">
                <h2>Fonction COMPTAGE</h2>
                <Carousel slides={[
                    <CarouselSlide type="VIDEO" assetPath={ vid1 } title="tuto1"/>,
                    <CarouselSlide type="VIDEO" assetPath={ vid2 } title="tuto2"/>,
                    <CarouselSlide type="IMAGE" assetPath="/assets/images/1628611687.png" title="1628611687"/>,
                    <CarouselSlide type="IMAGE" assetPath="/assets/images/icone-Odeone_jaune.png" title="icone Odeone jaune" />,
                    <CarouselSlide type="VIDEO" assetPath={ vid3 } title="tuto3"/>
                ]} />
            </div>
        </div>
    )
}