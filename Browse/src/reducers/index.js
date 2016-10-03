import { combineReducers } from 'redux';
import contracts from './contractReducer';

const rootReducer = combineReducers({
  contracts
});

export default rootReducer;
