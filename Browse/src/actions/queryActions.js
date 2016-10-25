import * as types from '../constants/actionTypes';
import { getQuerySuggestions } from '../utlits/spBaseService';

export function loadQuerySuggestionsSuccess(suggestions) {
    return { type: types.LOAD_QUERY_SUGGESTIONS_SUCCESS, suggestions };
}

export function loadQuerySuggestions(){
    return function(dispatch) {
        return getQuerySuggestions()
            .then((suggestions) => {
                dispatch(loadQuerySuggestionsSuccess(suggestions))
            })
            .catch((error) => {
                throw error;
            });
    };
}
