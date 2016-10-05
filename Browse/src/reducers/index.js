import { combineReducers } from 'redux';
import contracts from './contractReducer';
import categories from './categoryReducer';

const rootReducer = combineReducers({
  contracts,
  categories
});

export default rootReducer;
