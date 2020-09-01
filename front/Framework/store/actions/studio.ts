import {studioType} from "../actionCreators";
import {IStudio} from "../../interfaces/IStudioReducer";

export const studioCreateSuccess = (id: number) => ({type: studioType.STUDIO_CREATE_SUCCESS, id});
export const studioCreateFailure = (errorText, error = null) => ({
    type: studioType.STUDIO_CREATE_FAILURE,
    errorText,
    error
});
export const studioCreateRequest = (values) => ({type: studioType.STUDIO_CREATE_REQUEST, data: values});

export const studioParse = (data: boolean = false) => ({type: studioType.STUDIO_PARSE, data});

export const studioUpdatePricesFailure = (errorText, error = null) => ({
    type: studioType.STUDIO_UPDATE_PRICES_FAILURE,
    errorText,
    error
});

export const studioUpdatePricesSuccess = () => ({
    type: studioType.STUDIO_UPDATE_PRICES_SUCCESS,
});
export const studioUpdateImagesFailure = (errorText, error = null) => ({
    type: studioType.STUDIO_UPDATE_IMAGES_FAILURE,
    error,
    errorText
});
export const studioUpdateImagesSuccess = () => ({type: studioType.STUDIO_UPDATE_IMAGES_SUCCESS});


export const studiosAllFailure = (errorText, error = null) => ({
    type: studioType.STUDIO_ALL_FAILURE,
    error,
    errorText
});
export const studiosAllSuccess = (studios: IStudio[]) => ({type: studioType.STUDIO_ALL_SUCCESS, studios});

export const studiosAllPricesFailure = (errorText, error) => ({
    type: studioType.STUDIO_GET_ALL_PRICES_FAILURE,
    error,
    errorText
});
export const studiosAllPricesSuccess = (prices) => ({type: studioType.STUDIO_GET_ALL_PRICES_SUCCESS, prices});
