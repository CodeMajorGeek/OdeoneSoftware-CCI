const initialState = { activeModal: "NONE" }

function modalReducer(state = initialState, action) {
    if (action.type === "showLoginModal")
        return { ...state, activeModal: "LOGIN" }
    else if (action.type === "showRegisterModal")
        return { ...state, activeModal: "REGISTER" }
    else
        return { ...state, activeModal: "NONE" }
}

export default modalReducer