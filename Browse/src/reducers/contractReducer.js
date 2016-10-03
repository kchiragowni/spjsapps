import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function contractReducer(state = initialState.contracts, action) {
    switch(action.type) {
        case types.CREATE_CONTRACT_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.contract)
            ];
        case types.UPDATE_CONTRACT_SUCCESS:
            return [
              ...state.filter(contract => contract.id !== action.contract.id),
              Object.assign({}, action.contract)
            ];
        case types.LOAD_CONTRACTS_SUCCESS:
          return action.contracts;
        default:
            return state;
    }
}
