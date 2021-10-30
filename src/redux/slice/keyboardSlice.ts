import { createSlice } from '@reduxjs/toolkit';

interface KeyboardState {
  isKeyboardVisible: boolean;
}

const initialState: KeyboardState = {
  isKeyboardVisible: false,
};

const keyboardSlice = createSlice({
  name: 'isKeyboardVisible',
  initialState,
  reducers: {
    showKeyboard(state) {
      // it's okey to do this because immer makes it immutable under the hood
      state.isKeyboardVisible = true;
    },
    hideKeyboard(state) {
      state.isKeyboardVisible = false;
    },
  },
});

export const { showKeyboard, hideKeyboard } = keyboardSlice.actions;
export default keyboardSlice.reducer;
