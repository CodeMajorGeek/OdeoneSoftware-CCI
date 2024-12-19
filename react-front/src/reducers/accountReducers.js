const initialState = { adminView: false, adminMode: false, authMode: false }

function accountReducer(state = initialState, action) {
    if (action.type === "toggleAdminView")
        return { ...state, adminView: !state.adminView }
    else if (action.type === "setAdminMode")
        return { ...state, authMode: true, adminMode: action.payload.mode }
    else if (action.type === "setAuthenticatedMode")
        return { ...state, authMode: action.payload.mode, adminMode: action.payload.admin }
    else if (action.type === "resetAuthentification")
        return { ...state, adminMode: false, authMode: false }
    return state
}

export default accountReducer