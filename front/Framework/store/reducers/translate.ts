import {translationType} from "../actionCreators";
import {HYDRATE} from "next-redux-wrapper";

export const INITIAL_STATE = {
    parseTranslatesLoaded: false,
    translationLoaded: false,
    translation: {},
    error: false,
    errorMessage: ""
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state, // use previous state
                ...action.payload.translate, // apply delta from hydration
            }
        }
        case translationType.TRANSLATION_SUCCESS: {
            return {
                ...state,
                parseTranslatesLoaded: true,
                translationLoaded: true,
                translation: action.translation,
                error: false
            }
        }
        case translationType.TRANSLATION_FAILURE: {
            return {
                ...state,
                parseTranslatesLoaded: false,
                translationLoaded: false,
                translation: {},
                error: true,
                errorMessage: action.error
            }
        }
        case translationType.TRANSLATION_REQUEST: {
            return {
                ...state,
                parseTranslatesLoaded: false,
                translationLoaded: false
            }
        }
        default: {
            return state;
        }
    }
}
