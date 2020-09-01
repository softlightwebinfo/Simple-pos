import {translationType} from "../actionCreators";

export const translationSuccess = (translation) => ({type: translationType.TRANSLATION_SUCCESS, translation: translation});
export const translationFailure = (errorText, error = null) => ({type: translationType.TRANSLATION_FAILURE, errorText, error});
export const translationRequest = (language: string) => ({type: translationType.TRANSLATION_REQUEST, language});
