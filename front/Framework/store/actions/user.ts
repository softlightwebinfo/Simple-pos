import {userType} from "../actionCreators";
import {IUser} from "../../interfaces/IUserReducer";

export const userAllSuccess = (users: IUser[]) => ({type: userType.USER_ALL_SUCCESS, users});
export const userAllFailure = (errorText, error = null) => ({type: userType.USER_ALL_FAILURE, errorText, error});
