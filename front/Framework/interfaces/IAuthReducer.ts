import {IAuth} from "./IAuth";

export interface IAuthReducer {
    parseAuthLoaded: boolean,
    authLoaded: boolean,
    auth: IAuth | null,
    error: boolean,
    errorMessage: string
}
