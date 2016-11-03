import * as types from '../constants/actionTypes';
import { getQuerySuggestions } from '../utlits/spBaseService';

export function loadQuerySuggestionsSuccess(querySuggestions) {
    return { type: types.LOAD_QUERY_SUGGESTIONS_SUCCESS, querySuggestions };
}

export function updateQuerySuccess(query){
    return { type: types.UPDATE_QUERY_SUCCESS, query }; 
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

export function updateQuery(query) {
    return function(dispatch){
        dispatch(updateQuerySuccess(query));
    };
}
