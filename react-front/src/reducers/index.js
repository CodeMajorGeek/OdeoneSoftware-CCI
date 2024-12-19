import { combineReducers } from "redux"
import modalReducer from "./modalReducers"
import accountReducer from "./accountReducers"

const rootReducer = combineReducers({
    modal: modalReducer,
    account: accountReducer
})

export default rootReducer