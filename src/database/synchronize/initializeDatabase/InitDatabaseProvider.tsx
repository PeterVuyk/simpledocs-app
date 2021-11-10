import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import configurationsDAO from '../../../configurations/configurationsDAO';
import configurationsStorage from '../../../configurations/configurationsStorage';
import internetConnectivity from '../../../helper/internetConnectivity';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  INIT_DATABASE_STATE,
  INTERNET_REQUIRED_STATE,
  STARTUP_FAILURE_STATE,
  STARTUP_SUCCESSFUL_STATE,
  UPDATE_AGGREGATES_STATE,
  updateStartupState,
} from '../../../redux/slice/startupStateSlice';
import useInitializeDatabase from './useInitializeDatabase';

interface Props {
  children: ReactNode;
}

const InitDatabaseProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const currentStartupState = useAppSelector(
    state => state.startupState.currentState,
  );

  const { initializeDatabase, initializationDatabaseSuccessful } =
    useInitializeDatabase();

  const isFirstStartup = async (): Promise<boolean> => {
    return !(await configurationsStorage.getSystemConfiguration());
  };

  const hasInternetConnection = async (): Promise<boolean> => {
    return internetConnectivity.hasInternetConnection();
  };

  const init = useCallback(async () => {
    if ((await isFirstStartup()) && !(await hasInternetConnection())) {
      dispatch(updateStartupState({ currentState: INTERNET_REQUIRED_STATE }));
      return;
    }
    await initializeDatabase();
  }, [dispatch, initializeDatabase]);

  const handleError = useCallback(async () => {
    dispatch(
      updateStartupState({
        currentState: await configurationsDAO
          .isStartupSuccessful()
          .then(success =>
            success ? STARTUP_SUCCESSFUL_STATE : STARTUP_FAILURE_STATE,
          ),
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (currentStartupState === INIT_DATABASE_STATE) {
      init();
    }
  }, [currentStartupState, dispatch, handleError, init]);

  useEffect(() => {
    if (initializationDatabaseSuccessful === false) {
      handleError();
    }
    if (initializationDatabaseSuccessful === true) {
      dispatch(updateStartupState({ currentState: UPDATE_AGGREGATES_STATE }));
    }
  }, [dispatch, handleError, initializationDatabaseSuccessful]);

  return <>{children}</>;
};

export default InitDatabaseProvider;
