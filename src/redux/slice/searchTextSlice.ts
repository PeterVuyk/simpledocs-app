import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchTextState {
  chapter: string;
  searchText: string;
  bookType: string | null;
}

const initialState: SearchTextState = {
  searchText: '',
  chapter: '',
  bookType: null,
};

const searchTextSlice = createSlice({
  name: 'searchText',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<SearchTextState>) {
      // it's okey to do this because immer makes it immutable under the hood
      state.searchText = action.payload.searchText;
      state.chapter = action.payload.chapter;
      state.bookType = action.payload.bookType;
    },
  },
});

export const { setSearchText } = searchTextSlice.actions;
export default searchTextSlice.reducer;
