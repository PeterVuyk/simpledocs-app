import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import logger from '../../util/logger';
import internetConnectivity from '../../helper/internetConnectivity';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  AUTHENTICATE_STATE,
  INIT_DATABASE_STATE,
  INTERNET_REQUIRED_STATE,
  setIsFirstStartup,
  STARTUP_FAILURE_STATE,
  updateStartupState,
} from '../../redux/slice/startupStateSlice';
import configurationsStorage from '../../storage/configurationsStorage';
import { auth } from '../firebase';

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const currentStartupState = useAppSelector(
    state => state.startupState.currentState,
  );

  const signIn = useCallback(async () => {
    if (!(await internetConnectivity.hasInternetConnection())) {
      dispatch(updateStartupState(INTERNET_REQUIRED_STATE));
    }
    await signInAnonymously(auth).catch(error => {
      logger.error('signing in user as anonymous failed', error.code);
      dispatch(updateStartupState(STARTUP_FAILURE_STATE));
    });
  }, [dispatch]);

  useEffect(() => {
    return onAuthStateChanged(auth, async user => {
      if (currentStartupState !== AUTHENTICATE_STATE) {
        return;
      }
      if (user) {
        dispatch(updateStartupState(INIT_DATABASE_STATE));
        return;
      }
      if (!(await configurationsStorage.getSystemConfiguration())) {
        dispatch(setIsFirstStartup(true));
      }
      signIn();
    });
  }, [currentStartupState, dispatch, signIn]);

  return <>{children}</>;
};

export default AuthProvider;
