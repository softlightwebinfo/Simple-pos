import {authType} from "../actionCreators";
import {HYDRATE} from "next-redux-wrapper";
import {IAuthReducer} from "../../interfaces/IAuthReducer";

export const INITIAL_STATE: IAuthReducer = {
    parseAuthLoaded: false,
    authLoaded: false,
    auth: null,
    error: false,
    errorMessage: ""
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state, // use previous state
                ...action.payload.auth, // apply delta from hydration
            }
        }
        case authType.AUTH_SUCCESS: {
            return {
                ...state,
                parseAuthLoaded: true,
                authLoaded: false,
                auth: action.auth,
                error: false
            }
        }
        case authType.AUTH_FAILURE: {
            return {
                ...state,
                parseAuthLoaded: false,
                authLoaded: false,
                auth: null,
                error: true,
                errorMessage: action.error
            }
        }
        case authType.AUTH_REQUEST: {
            return {
                ...state,
                parseAuthLoaded: false,
                authLoaded: true
            }
        }
        case authType.AUTH_LOGOUT_REQUEST: {
            return {
                ...state,
                auth: null,
            }
        }
        default: {
            return state;
        }
    }
}
