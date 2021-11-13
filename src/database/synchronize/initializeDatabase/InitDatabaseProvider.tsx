import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import configurationsStorage from '../../../configurations/configurationsStorage';
import internetConnectivity from '../../../helper/internetConnectivity';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  INIT_DATABASE_STATE,
  INTERNET_REQUIRED_STATE,
  updateStartupState,
} from '../../../redux/slice/startupStateSlice';
import useInitializeDatabase from './useInitializeDatabase';

interface Props {
  children: ReactNode;
}

const InitDatabaseProvider: FC<Props> = ({ children }) => {
  const { prepareDatabase } = useInitializeDatabase();
  const dispatch = useAppDispatch();
  const { currentState } = useAppSelector(state => state.startupState);

  const isFirstStartup = async (): Promise<boolean> => {
    return !(await configurationsStorage.getSystemConfiguration());
  };

  const hasInternetConnection = async (): Promise<boolean> => {
    return internetConnectivity.hasInternetConnection();
  };

  const init = useCallback(async () => {
    if ((await isFirstStartup()) && !(await hasInternetConnection())) {
      dispatch(updateStartupState(INTERNET_REQUIRED_STATE));
      return;
    }
    await prepareDatabase();
  }, [dispatch, prepareDatabase]);

  useEffect(() => {
    if (currentState === INIT_DATABASE_STATE) {
      init();
    }
  }, [currentState, dispatch, init]);

  return <>{children}</>;
};

export default InitDatabaseProvider;
