import {bannerType} from "../actionCreators";
import {IBanner} from "../../interfaces/IBannerReducer";

export const bannerSuccess = () => ({type: bannerType.BANNER_CREATE_SUCCESS});
export const bannerFailure = (errorText, error = null) => ({type: bannerType.BANNER_CREATE_FAILURE, errorText, error});
export const bannerRequest = (values) => ({type: bannerType.BANNER_CREATE_REQUEST, data: values});

export const bannerListSuccess = (data: IBanner[]) => ({type: bannerType.BANNER_LIST_SUCCESS, data});
export const bannerListFailure = (errorText, error = null) => ({type: bannerType.BANNER_LIST_FAILURE, errorText, error});
export const bannerListRequest = () => ({type: bannerType.BANNER_LIST_REQUEST});

export const bannerActiveSuccess = (id: number, active: boolean) => ({type: bannerType.BANNER_ACTIVE_SUCCESS, id, active});
export const bannerActiveFailure = (errorText, error = null) => ({type: bannerType.BANNER_ACTIVE_FAILURE, errorText, error});
export const bannerActiveRequest = (id: number, active: boolean) => ({type: bannerType.BANNER_ACTIVE_REQUEST, id, active});

export const bannerUpdateSuccess = (id: number, data) => ({type: bannerType.BANNER_UPDATE_SUCCESS, id, data});
export const bannerUpdateFailure = (errorText, error = null) => ({type: bannerType.BANNER_UPDATE_FAILURE, errorText, error});
export const bannerUpdateRequest = (id: number, values) => ({type: bannerType.BANNER_UPDATE_REQUEST, data: values, id});

export const bannerDeleteSuccess = (id: number, image: string) => ({type: bannerType.BANNER_DELETE_SUCCESS, id, image});
export const bannerDeleteFailure = (errorText, error = null) => ({type: bannerType.BANNER_DELETE_FAILURE, errorText, error});
export const bannerDeleteRequest = (id: number, image: string) => ({type: bannerType.BANNER_DELETE_REQUEST, id, image});

export const bannerParse = (data: boolean = false) => ({type: bannerType.BANNER_PARSE, data});
