import { createStore, combineReducers } from 'redux';
import scrollReducer from './reducers/scrollReducer';
import searchReducer from './reducers/searchReducer';
import keyboardReducer from './reducers/keyboardReducer';

const rootReducer = combineReducers({
  scrolling: scrollReducer,
  searching: searchReducer,
  keyboard: keyboardReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
