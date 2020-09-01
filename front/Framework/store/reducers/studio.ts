import {studioType} from "../actionCreators";
import {HYDRATE} from "next-redux-wrapper";
import {IStudioReducer} from "../../interfaces/IStudioReducer";

export const INITIAL_STATE: IStudioReducer = {
    parseStudioLoaded: false,
    studioLoaded: false,
    studios: [],
    error: false,
    errorMessage: "",
    selected: 0,
    count: 0,
    prices: [],
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state, // use previous state
                ...action.payload.studio, // apply delta from hydration
            }
        }
        case studioType.STUDIO_GET_ALL_PRICES_FAILURE:
        case studioType.STUDIO_UPDATE_PRICES_FAILURE:
        case studioType.STUDIO_UPDATE_IMAGES_FAILURE:
        case studioType.STUDIO_CREATE_FAILURE: {
            return {
                ...state,
                parseStudioLoaded: false,
                studioLoaded: false,
                error: true,
                errorMessage: action.error
            }
        }
        case studioType.STUDIO_CREATE_REQUEST: {
            return {
                ...state,
                parseStudioLoaded: false,
                STUDIOLoaded: true
            }
        }
        case studioType.STUDIO_UPDATE_IMAGES_SUCCESS:
        case studioType.STUDIO_UPDATE_PRICES_SUCCESS:
        case studioType.STUDIO_CREATE_SUCCESS: {
            return {
                ...state,
                parseStudioLoaded: true,
                STUDIOLoaded: false,
                error: false,
                selected: action.id,
            }
        }
        case studioType.STUDIO_PARSE: {
            return {
                ...state,
                parseStudioLoaded: action.data,
            }
        }
        case studioType.STUDIO_ALL_SUCCESS: {
            return {
                ...state,
                studios: action.studios.Result.map((item) => ({...item, prices: []})) || [],
                count: action.studios.count || 0,
            }
        }
        case studioType.STUDIO_GET_ALL_PRICES_SUCCESS: {
            let studios = state.studios;
            action.prices.Result.forEach(i => {
                let st = studios.findIndex(it => it.id == i.fkStudio)
                if (st != -1) {
                    studios[st].prices.push(i);
                }
            })
            return {
                ...state,
                prices: action.prices.Result,
                studios,
            }
        }
        default: {
            return state;
        }
    }
}
