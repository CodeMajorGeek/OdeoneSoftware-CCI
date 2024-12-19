const initialState = { adminView: false }

function adminReducer(state = initialState, action) {
    if (action.type === "toggleAdminView")
        return { ...state, adminView: !state.adminView }
    return state
}

export default adminReducer