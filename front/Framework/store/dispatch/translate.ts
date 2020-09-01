// @ts-ignore
import {translationFailure, translationRequest, translationSuccess} from "../actions/translate";

export interface IChangeLanguage {
    language: string;
}

// @ts-ignore
export const changeLanguage = (action: IChangeLanguage) => (dispatch) => {
    const {language} = action;
    dispatch(translationRequest(action.language));
    if (language) {
        try {
            const translate = require(`../../../config/translates/${language}.json`);
            console.log(`=== Translate lang from folder: `, translate.language);
            dispatch(translationSuccess(translate));
        } catch (err) {
            dispatch(translationFailure("Error to change language: ", err));
        }
    } else {
        dispatch(translationFailure("There's no language selected."));
    }
};
