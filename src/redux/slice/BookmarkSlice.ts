import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bookmark } from '../../model/bookPages/Bookmark';

interface BookmarkState {
  bookmarks: Bookmark[];
}

const initialState: BookmarkState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setBookmarks(state, action: PayloadAction<Bookmark[]>) {
      // it's okey to do this because immer makes it immutable under the hood
      state.bookmarks = action.payload;
    },
  },
});

export const { setBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
