import { createStore, combineReducers } from 'redux';
import scrollReducer from './reducers/scrollReducer';
import regulationChapterReducer from './reducers/regulationChapterReducer';

const rootReducer = combineReducers({
  scrolling: scrollReducer,
  currentRegulationsChapter: regulationChapterReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
