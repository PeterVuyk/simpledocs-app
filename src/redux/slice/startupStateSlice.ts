import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const AUTHENTICATE_STATE = 'authenticate';
export const INIT_DATABASE_STATE = 'initDatabase';
export const INTERNET_REQUIRED_STATE = 'internetRequired';
export const UPDATE_AGGREGATES_STATE = 'updateAggregates';
export const STARTUP_FAILURE_STATE = 'startupFailure';
export const STARTUP_SUCCESSFUL_STATE = 'startupSuccessful';

interface StartupStateApp {
  currentState:
    | 'authenticate'
    | 'initDatabase'
    | 'internetRequired'
    | 'updateAggregates'
    | 'startupFailure'
    | 'startupSuccessful';
}

const initialState: StartupStateApp = {
  currentState: AUTHENTICATE_STATE,
};

const startupStateSlice = createSlice({
  name: 'initDatabaseStartup',
  initialState,
  reducers: {
    updateStartupState(state, action: PayloadAction<StartupStateApp>) {
      state.currentState = action.payload.currentState;
    },
  },
});

export const { updateStartupState } = startupStateSlice.actions;
export default startupStateSlice.reducer;
