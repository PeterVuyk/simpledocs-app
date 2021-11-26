import { createSlice } from '@reduxjs/toolkit';

interface ScrollingState {
  scrollDirection: string;
}

const initialState: ScrollingState = {
  scrollDirection: 'up',
};

const scrollingSlice = createSlice({
  name: 'scrolling',
  initialState,
  reducers: {
    scrollUp(state) {
      // it's okey to do this because immer makes it immutable under the hood
      state.scrollDirection = 'up';
    },
    scrollDown(state) {
      state.scrollDirection = 'down';
    },
  },
});

export const { scrollDown, scrollUp } = scrollingSlice.actions;
export default scrollingSlice.reducer;
