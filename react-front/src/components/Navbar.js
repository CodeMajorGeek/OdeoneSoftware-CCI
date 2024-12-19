import "./styles/Navbar.css"

import { Link } from "react-router-dom"
import { Fragment } from "react"

export default function Navbar({ navTabs }) {
    return (
        <nav>
            <ul>
                {
                    navTabs.map((element, index, tab) => (
                        <Fragment key={element["title"]}>
                            <li>
                                <Link 
                                    to={element["ref"]} 
                                    onClick={() => element["handler"] && element["handler"]()} 
                                >
                                    {element["title"]}
                                </Link>
                            </li>
                            {index < tab.length - 1 && (
                                <li>
                                    <p className="separator">|</p>
                                </li>
                            )}
                        </Fragment>
                    ))
                }
            </ul>
        </nav>
    )
}