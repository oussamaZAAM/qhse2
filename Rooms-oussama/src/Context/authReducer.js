const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true,
                error: false,
            }
        case "LOGIN_SUCCESS":
            return{
                user: action.payload[0],
                isFetching: false,
                error: false,
            }
        case "LOGIN_FAILURE":
            return{
                user: null,
                isFetching: true,
                error: false,
            }
        case "SELECT_SUCCESS":
            return{
                org: action.payload[1],
                user: action.payload[0]
            }
        default:
            return state
    }
}

export default AuthReducer;