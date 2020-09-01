import {combineReducers} from "redux";

import translate from "./translate";
import auth from "./auth";
import banner from "./banner";
import user from "./user";
import studio from "./studio";
import store from "./store";

const rootReducer = combineReducers({
    translate,
    auth,
    banner,
    user,
    studio,
    store,
});

export default rootReducer;
