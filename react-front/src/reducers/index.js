import { combineReducers } from "redux"
import modalReducer from "./modalReducers"

const rootReducer = combineReducers({
    modal: modalReducer
})

export default rootReducer