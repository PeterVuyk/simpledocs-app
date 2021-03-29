import { createStore, combineReducers } from 'redux';
import scrollReducer from './reducers/scrollReducer';

const rootReducer = combineReducers({
  scrolling: scrollReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
