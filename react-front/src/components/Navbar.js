import "./styles/Navbar.css"

import { Link } from "react-router-dom"
import { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Navbar({ navTabs }) {
    const dispatch = useDispatch()

    const authMode = useSelector((state) => state.account.authMode)
    const linkHandler = (event, needLogin, handler) => {
        if (handler)
            handler()
        
        if (!authMode && needLogin) {
            event.preventDefault()
            dispatch({ type: "showNeedLoginModal" })
        }
    }

    return (
        <nav>
            <ul>
                {
                    navTabs.map((element, index, tab) => (
                        <Fragment key={element["title"]}>
                            <li>
                                <Link
                                    to={element["ref"]}
                                    onClick={(e) => linkHandler(e, element["needLogin"], element["handler"])} 
                                    className={ (!authMode && element["needLogin"]) && "need-login" }
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