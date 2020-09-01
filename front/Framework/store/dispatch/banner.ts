import {getApi} from "settings";
import {bannerActiveFailure, bannerActiveSuccess, bannerDeleteFailure, bannerDeleteSuccess, bannerFailure, bannerListFailure, bannerListRequest, bannerListSuccess, bannerParse, bannerSuccess, bannerUpdateFailure, bannerUpdateSuccess} from "../actions/banner";

export const createBanner = (action) => async dispatch => {
    let data = new FormData();
    data.append("title", action.data.Title);
    data.append("page", action.data.page);
    data.append("file", action.data.File.file);
    data.append("button", action.data.Button || null);
    data.append("route", action.data.Route || null);
    data.append("subtitle", action.data.Subtitle || null);
    try {
        const res = await fetch(getApi("banner"), {
            body: data,
            method: "POST"
        });
        const response = await res.json();
        if (response.error) {
            dispatch(bannerFailure(response.error));
        } else {
            dispatch(bannerSuccess());
        }
        setTimeout(() => {
            dispatch(bannerParse());
        }, 1000);
    } catch (err) {
        dispatch(bannerFailure("Error to change language: ", err));
    }
};

export const updateBanner = (action) => async dispatch => {
    let data = new FormData();
    data.append("id", action.id);
    data.append("title", action.data.Title);
    data.append("page", action.data.page);
    if (action.data.File) {
        data.append("file", action.data.File.file);
    }
    data.append("button", action.data.Button || null);
    data.append("route", action.data.Route || null);
    data.append("subtitle", action.data.Subtitle || null);
    try {
        const res = await fetch(getApi(`banner/${action.id}`), {
            body: data,
            method: "PUT"
        });
        const response = await res.json();
        if (response.error) {
            dispatch(bannerUpdateFailure(response.error));
        } else {
            dispatch(bannerUpdateSuccess(action.id, response));
            setTimeout(() => {
                dispatch(bannerParse());
            }, 1000)
        }
    } catch (err) {
        dispatch(bannerUpdateFailure("Error to change language: ", err));
    }
};
export const getAllBanner = () => async dispatch => {
    try {
        dispatch(bannerListRequest());
        const res = await fetch(getApi("banner"));
        const response = await res.json();
        if (response.error) {
            dispatch(bannerListFailure(response.error));
        } else {
            dispatch(bannerListSuccess(response.Result));
        }
        setTimeout(() => {
            dispatch(bannerParse());
        }, 1000)
    } catch (err) {
        dispatch(bannerListFailure("Error to change language: ", err));
    }
};

export const activeBanner = (action) => async dispatch => {
    try {
        let active = !action.active;
        const res = await fetch(getApi(`banner/${action.id}/${active ? "active" : "inactive"}`), {
            body: JSON.stringify({}),
            method: "PUT"
        });
        const response = await res.json();
        if (response.error) {
            dispatch(bannerActiveFailure(response.error));
        } else {
            dispatch(bannerActiveSuccess(action.id, active));
        }
        setTimeout(() => {
            dispatch(bannerParse());
        }, 1000);
    } catch (err) {
        dispatch(bannerActiveFailure("Error no activate banner: ", err));
    }
};
export const deleteBanner = (action) => async dispatch => {
    try {
        const res = await fetch(getApi(`banner/${action.id}`), {
            body: JSON.stringify({
                image: action.image,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE"
        });
        const response = await res.json();
        if (response.error) {
            dispatch(bannerDeleteFailure(response.error));
        } else {
            dispatch(bannerDeleteSuccess(action.id, action.image));
        }
        setTimeout(() => {
            dispatch(bannerParse());
        }, 1000);
    } catch (err) {
        dispatch(bannerDeleteFailure("Error no activate banner: ", err));
    }
};
