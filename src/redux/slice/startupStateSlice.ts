import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const AUTHENTICATE_STATE = 'authenticate';
export const RESTORE_APP_FROM_FAILED_STARTUP = 'restoreAppFromFailedStartup';
export const INIT_DATABASE_STATE = 'initDatabase';
export const INTERNET_REQUIRED_STATE = 'internetRequired';
export const UPDATE_AGGREGATES_STATE = 'updateAggregates';
export const STARTUP_FAILURE_STATE = 'startupFailure';
export const STARTUP_SUCCESSFUL_STATE = 'startupSuccessful';

export type StartupState =
  | 'authenticate'
  | 'restoreAppFromFailedStartup'
  | 'initDatabase'
  | 'internetRequired'
  | 'updateAggregates'
  | 'startupFailure'
  | 'startupSuccessful';

interface StartupStateApp {
  currentState: StartupState;
  retriesOnFailure: number;
}

const initialState: StartupStateApp = {
  currentState: AUTHENTICATE_STATE,
  retriesOnFailure: 0,
};

const startupStateSlice = createSlice({
  name: 'initDatabaseStartup',
  initialState,
  reducers: {
    retryOnFailure(state) {
      state.retriesOnFailure++;
      if (state.retriesOnFailure < 3) {
        state.currentState = AUTHENTICATE_STATE;
        return;
      }
      if (state.retriesOnFailure === 4) {
        state.currentState = STARTUP_FAILURE_STATE;
        return;
      }
      state.currentState = RESTORE_APP_FROM_FAILED_STARTUP;
    },
    updateStartupState(state, action: PayloadAction<StartupState>) {
      state.currentState = action.payload;
    },
  },
});

export const { retryOnFailure, updateStartupState } = startupStateSlice.actions;
export default startupStateSlice.reducer;
