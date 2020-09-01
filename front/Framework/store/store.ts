// #region Global Imports
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
// eslint-disable-next-line import/no-extraneous-dependencies
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
// #endregion Global Imports

// #region Local Imports
import Reducers from "./reducers";
import {createWrapper} from "next-redux-wrapper";
// #endregion Local Imports

export const makeStore = (_, initialState: {}) => {
    return createStore(
        Reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
};
// @ts-ignore
export default createWrapper(makeStore, {debug: false});
