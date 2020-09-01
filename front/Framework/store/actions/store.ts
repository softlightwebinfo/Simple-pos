import {IStore} from "../../interfaces/IStoreReducer";
import {storeType} from "../actionCreators";

export const setGetAllStudios = (stores: IStore[]) => ({type: storeType.STORE_GET_ALL_STUDIO_SUCCESS, data: stores});
export const setGetAllStudiosRQ = () => ({type: storeType.STORE_GET_ALL_STUDIO_REQUEST});
export const setGetAllStudiosFail = (error: any, err: any) => ({
    type: storeType.STORE_GET_ALL_STUDIO_FAILURE,
    error,
    err
});