import {getApi} from "@settings";
import {setGetAllStudios, setGetAllStudiosFail, setGetAllStudiosRQ} from "../actions/store";

export const getAllStores = (cookies) => async (dispatch) => {
    try {
        dispatch(setGetAllStudiosRQ());
        const res = await fetch(getApi("stores"), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cookie': cookies,
            },
        });
        const response = await res.json();
        if (response.error) {
            dispatch(setGetAllStudiosFail(response.error, null));
        } else {
            dispatch(setGetAllStudios(response));
        }
    } catch (err) {
        dispatch(setGetAllStudiosFail("Error to change language: ", err));
    }
};