import * as types from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';

export default function categoryReducer(state = initialState.categories, action) {
    switch(action.type) {
        case types.CREATE_CATEGORY_SUCCESS:
            return [
                ...state,
                objectAssign({}, action.category)
            ];
        case types.UPDATE_CATEGORY_SUCCESS:
            return [
              ...state.filter(category => category.id !== action.category.id),
              Object.assign({}, action.category)
            ];
        case types.LOAD_CATEGORY_SUCCESS:
          return action.categories;
        default:
            return state;
    }
}
