import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InternetSuggestedState {
  internetSuggested: boolean;
}

const initialState: InternetSuggestedState = {
  internetSuggested: false,
};

const internetSuggestedState = createSlice({
  name: 'internetSuggested',
  initialState,
  reducers: {
    setInternetSuggested(state, action: PayloadAction<boolean>) {
      state.internetSuggested = action.payload;
    },
  },
});

export const { setInternetSuggested } = internetSuggestedState.actions;
export default internetSuggestedState.reducer;
