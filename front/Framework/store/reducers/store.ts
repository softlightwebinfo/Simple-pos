import {HYDRATE} from "next-redux-wrapper";
import {IStoreReducer} from "../../interfaces/IStoreReducer";
import {storeType} from "../actionCreators";

export const INITIAL_STATE: IStoreReducer = {
    stores: [],
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state, // use previous state
                ...action.payload.store, // apply delta from hydration
            }
        }
        case storeType.STORE_GET_ALL_STUDIO_SUCCESS: {
            return {
                stores: action.data.stores || [],
            }
        }
        default: {
            return state;
        }
    }
}
