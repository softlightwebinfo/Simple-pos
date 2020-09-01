import {getApi} from "settings";
import {userAllFailure, userAllSuccess} from "../actions/user";

export const userAllRequest = (cookies) => async (dispatch) => {
    try {
        const res = await fetch(getApi("users"), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cookie': cookies,
            },
        });
        const response = await res.json();
        if (response.error) {
            dispatch(userAllFailure(response.error));
        } else {
            dispatch(userAllSuccess(response));
        }
    } catch (err) {
        dispatch(userAllFailure("Error to change language: ", err));
    }
};
