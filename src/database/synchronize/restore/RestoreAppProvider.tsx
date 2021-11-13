import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import configurationsStorage from '../../../configurations/configurationsStorage';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  AUTHENTICATE_STATE,
  RESTORE_APP_FROM_FAILED_STARTUP,
  STARTUP_FAILURE_STATE,
  updateStartupState,
} from '../../../redux/slice/startupStateSlice';
import tearDown from '../restore/tearDownDatabase';
import logger from '../../../util/logger';
import debugHandler from '../../../debug/debugHandler';

interface Props {
  children: ReactNode;
}

const RestoreAppProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { currentState } = useAppSelector(state => state.startupState);

  const restore = useCallback(async () => {
    await debugHandler
      .dumpConfigToStorage()
      .then(tearDown.down)
      .then(configurationsStorage.removeSystemConfiguration)
      .then(() => {
        dispatch(updateStartupState(AUTHENTICATE_STATE));
      })
      .catch(reason => {
        logger.error(
          'RestoreAppProvider Tried to recover but failed resulting in a failure state',
          reason,
        );
        dispatch(updateStartupState(STARTUP_FAILURE_STATE));
      });
  }, [dispatch]);

  useEffect(() => {
    if (currentState === RESTORE_APP_FROM_FAILED_STARTUP) {
      restore();
    }
  }, [currentState, dispatch, restore]);

  return <>{children}</>;
};

export default RestoreAppProvider;
