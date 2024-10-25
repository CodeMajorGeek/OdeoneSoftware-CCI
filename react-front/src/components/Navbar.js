import "./styles/Navbar.css"

import { Link } from "react-router-dom"

export default function Navbar({ navTabs }) {
    return (
        <nav>
            <ul>
                {
                    navTabs.map((element, index, tab) => {
                        return (
                        <>
                            <li key={ element["title"] }>
                                <Link to={ element["ref"] }>{ element["title"] }</Link>
                            </li>
                            <li key={ element["title"] + "|" }>
                                <p className="separator">{ index === tab.length - 1 ? "" : "|" }</p>
                            </li>
                        </>)
                })
                }
            </ul>
        </nav>
    )
}