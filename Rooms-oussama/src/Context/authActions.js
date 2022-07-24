export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
    // payload: userCredentials,
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
});

export const AddOrg = (org) => ({
    type: "SELECT_SUCCESS",
    payload: org,
});


