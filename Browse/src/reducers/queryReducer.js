import * as types from '../constants/actionTypes';
import initialState from  './initialState';

export function querySuggestionsReducer(state = initialState.querySuggestions, action) {
    switch(action.type === types.CREATE_QUERY_SUGGESTIONS_SUCCESS) {
        case types.LOAD_QUERY_SUGGESTIONS_SUCCESS:
            return action.suggestions;
    }
} 
