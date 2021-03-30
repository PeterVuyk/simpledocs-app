import { createStore, combineReducers } from 'redux';
import scrollReducer from './reducers/scrollReducer';
import searchReducer from './reducers/searchReducer';

const rootReducer = combineReducers({
  scrolling: scrollReducer,
  searching: searchReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
