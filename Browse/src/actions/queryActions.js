import * as types from '../constants/actionTypes';
import { getQuerySuggestions } from '../utlits/spBaseService';

export function loadQuerySuggestionsSuccess(querySuggestions) {
    return { type: types.LOAD_QUERY_SUGGESTIONS_SUCCESS, querySuggestions };
}

export function loadQuerySuggestions(query){
    return function(dispatch) {
        return getQuerySuggestions(query)
            .then((querySuggestions) => {
                dispatch(loadQuerySuggestionsSuccess(querySuggestions.d.suggest.Queries.results));
            })
            .catch((error) => {
                throw error;
            });
    };
}
