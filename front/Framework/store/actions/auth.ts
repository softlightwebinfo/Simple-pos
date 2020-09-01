import {authType} from "../actionCreators";

export const authSuccess = (auth) => ({type: authType.AUTH_SUCCESS, auth});
export const authFailure = (errorText, error = null) => ({type: authType.AUTH_FAILURE, errorText, error});
export const authRequest = () => ({type: authType.AUTH_REQUEST});
export const authInitialRq = () => ({type: authType.AUTH_INITIAL_REQUEST});
export const authLogout = () => ({type: authType.AUTH_LOGOUT_REQUEST});
