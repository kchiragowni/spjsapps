import { combineReducers } from 'redux';
import contracts from './contractReducer';
import categories from './categoryReducer';
import { querySuggestionsReducer as querySuggestions } from './queryReducer';

const rootReducer = combineReducers({
  contracts,
  categories,
  querySuggestions
});

export default rootReducer;
