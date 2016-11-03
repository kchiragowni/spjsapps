import { combineReducers } from 'redux';
import contracts from './contractReducer';
import categories from './categoryReducer';
import querySuggestions, {queryReducer as query} from './queryReducer';

const rootReducer = combineReducers({
  contracts,
  categories,
  querySuggestions,
  query
});

export default rootReducer;
