import { combineReducers } from "redux"
import modalReducer from "./modalReducers"
import adminReducer from "./adminReducers"

const rootReducer = combineReducers({
    modal: modalReducer,
    admin: adminReducer
})

export default rootReducer