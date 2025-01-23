const initialState = { activeModal: "NONE" }

function modalReducer(state = initialState, action) {
    if (action.type === "showLoginModal")
        return { ...state, activeModal: "LOGIN" }
    else if (action.type === "showRegisterModal")
        return { ...state, activeModal: "REGISTER" }
    else if (action.type === "showNeedLoginModal")
        return { ...state, activeModal: "NEED_LOGIN" }
    else if (action.type === "showUpdateUserModal")
        return { ...state, activeModal: "UPDATE_USER" }
    else if (action.type === "closeModal")
        return { ...state, activeModal: "NONE" }
    return state
}

export default modalReducer