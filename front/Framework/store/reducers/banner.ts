import {bannerType} from "../actionCreators";
import {HYDRATE} from "next-redux-wrapper";
import {IBannerReducer} from "../../interfaces/IBannerReducer";

export const INITIAL_STATE: IBannerReducer = {
    parseBannerLoaded: false,
    bannerLoaded: false,
    banners: [],
    error: false,
    errorMessage: "",
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state, // use previous state
                ...action.payload.banner, // apply delta from hydration
            }
        }
        case bannerType.BANNER_UPDATE_FAILURE:
        case bannerType.BANNER_LIST_FAILURE:
        case bannerType.BANNER_DELETE_FAILURE:
        case bannerType.BANNER_CREATE_FAILURE: {
            return {
                ...state,
                parseBannerLoaded: false,
                bannerLoaded: false,
                error: true,
                errorMessage: action.error
            }
        }
        case bannerType.BANNER_DELETE_REQUEST:
        case bannerType.BANNER_UPDATE_REQUEST:
        case bannerType.BANNER_LIST_REQUEST:
        case bannerType.BANNER_CREATE_REQUEST: {
            return {
                ...state,
                parseBannerLoaded: false,
                bannerLoaded: true
            }
        }
        case bannerType.BANNER_CREATE_SUCCESS: {
            return {
                ...state,
                parseBannerLoaded: true,
                bannerLoaded: false,
                error: false
            }
        }
        case bannerType.BANNER_LIST_SUCCESS: {
            return {
                ...state,
                parseBannerLoaded: true,
                bannerLoaded: false,
                error: false,
                banners: action.data,
            }
        }
        case bannerType.BANNER_ACTIVE_SUCCESS: {
            let banner = state.banners.find(i => i.id == action.id);
            if (banner) {
                banner.active = action.active;
            }
            return {
                ...state,
                parseBannerLoaded: true,
                bannerLoaded: false,
                error: false,
                banners: state.banners,
            }
        }
        case bannerType.BANNER_UPDATE_SUCCESS: {
            let banner = state.banners.findIndex(i => i.id == action.id);
            if (banner > -1) {
                const {token, ...rest} = action.data;
                state.banners[banner] = rest;
            }
            return {
                ...state,
                parseBannerLoaded: true,
                bannerLoaded: false,
                error: false,
                banners: state.banners,
            }
        }
        case bannerType.BANNER_PARSE: {
            return {
                ...state,
                parseBannerLoaded: action.data,
            }
        }
        case bannerType.BANNER_DELETE_SUCCESS: {
            return {
                ...state,
                parseBannerLoaded: true,
                bannerLoaded: false,
                error: false,
                banners: state.banners.filter(i => i.id != action.id),
            }
        }
        default: {
            return state;
        }
    }
}
