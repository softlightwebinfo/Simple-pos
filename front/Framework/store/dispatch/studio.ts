import {getApi} from "@settings";
import {
    studioCreateFailure,
    studioCreateSuccess,
    studioParse, studiosAllFailure, studiosAllSuccess, studioUpdateImagesFailure, studioUpdateImagesSuccess,
    studioUpdatePricesFailure,
    studioUpdatePricesSuccess,
    studiosAllPricesSuccess,
    studiosAllPricesFailure
} from "../actions/studio";
import {IStudioPrices} from "../../interfaces/IStudioPrices";

export const createStudioRequest = (values) => async dispatch => {
    try {
        const res = await fetch(getApi("studio"), {
            body: JSON.stringify(values),
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const response = await res.json();
        if (response.error) {
            dispatch(studioCreateFailure(response.error));
        } else {
            dispatch(studioCreateSuccess(response.id));
        }
        setTimeout(() => {
            dispatch(studioParse());
        }, 1000);
    } catch (err) {
        dispatch(studioCreateFailure("Error to change language: ", err));
    }
};

export const updateStudioPriceRequest = (id, prices: IStudioPrices[]) => async dispatch => {
    try {
        const res = await fetch(getApi(`studio/${id}/prices`), {
            body: JSON.stringify({prices}),
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const response = await res.json();
        if (response.error) {
            dispatch(studioUpdatePricesFailure(response.error));
        } else {
            dispatch(studioUpdatePricesSuccess());
        }
        setTimeout(() => {
            dispatch(studioParse());
        }, 1000);
    } catch (err) {
        dispatch(studioUpdatePricesFailure("Error to change language: ", err));
    }
};

export const updateStudioImageRequest = (id: number, files: File[]) => async dispatch => {
    let data = new FormData();
    files.forEach((value) => {
        data.append(`file`, value);
    })
    try {
        const res = await fetch(getApi(`studio/${id}/images`), {
            body: data,
            method: "PUT"
        });
        const response = await res.json();
        if (response.error) {
            dispatch(studioUpdateImagesFailure(response.error));
        } else {
            dispatch(studioUpdateImagesSuccess());
        }
        setTimeout(() => {
            dispatch(studioParse());
        }, 1000);
    } catch (err) {
        dispatch(studioUpdateImagesFailure("Error to change language: ", err));
    }
};
export const studiosAllRequest = (cookies) => async (dispatch) => {
    try {
        const res = await fetch(getApi("studios"), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cookie': cookies,
            },
        });
        const response = await res.json();
        if (response.error) {
            dispatch(studiosAllFailure(response.error));
        } else {
            dispatch(studiosAllSuccess(response));
        }
    } catch (err) {
        dispatch(studiosAllFailure("Error to change language: ", err));
    }
};
export const studiosAllPricesRequest = (cookies) => async (dispatch) => {
    try {
        const res = await fetch(getApi("studios/prices"), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cookie': cookies,
            },
        });
        const response = await res.json();
        if (response.error) {
            dispatch(studiosAllPricesFailure("Error", response.error));
        } else {
            dispatch(studiosAllPricesSuccess(response));
        }
    } catch (err) {
        dispatch(studiosAllPricesFailure("Error to change language: ", err));
    }
};
