import {HYDRATE} from "next-redux-wrapper";
import {IUserReducer} from "../../interfaces/IUserReducer";
import {userType} from "../actionCreators";

export const INITIAL_STATE: IUserReducer = {
    users: [],
    count: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state, // use previous state
                ...action.payload.user, // apply delta from hydration
            }
        }
        case userType.USER_ALL_SUCCESS: {
            return {
                ...state,
                users: action.users.result,
                count: Number(action.users.count),
            }
        }
        default: {
            return state;
        }
    }
}
