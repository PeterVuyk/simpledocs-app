import { configureStore } from '@reduxjs/toolkit';
import keyboardReducer from './slice/keyboardSlice';
import searchTextReducer from './slice/searchTextSlice';
import scrollingReducer from './slice/scrollingSlice';
import startupStateReducer from './slice/startupStateSlice';
import bookmarkStateReducer from './slice/BookmarkSlice';

export const store = configureStore({
  reducer: {
    keyboard: keyboardReducer,
    searchText: searchTextReducer,
    scrolling: scrollingReducer,
    startupState: startupStateReducer,
    bookmarkState: bookmarkStateReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
