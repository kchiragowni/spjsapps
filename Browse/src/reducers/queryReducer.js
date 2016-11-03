import * as types from '../constants/actionTypes';
import initialState from  './initialState';

export default function querySuggestionsReducer(state = initialState.querySuggestions, action) {
    switch(action.type) {
        case types.LOAD_QUERY_SUGGESTIONS_SUCCESS:
            //console.log(action.querySuggestions);
            return action.querySuggestions;
        default:
            return state;
    }
} 

export function queryReducer(state = initialState.query, action) {
    switch(action.type) {
        case types.UPDATE_QUERY_SUCCESS:
            return action.query;
        default:
            return state;
    }
} 
