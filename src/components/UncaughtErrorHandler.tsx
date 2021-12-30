import React, { FC, ReactNode } from 'react';
import { retryOnFailure } from '../redux/slice/startupStateSlice';
import { useAppDispatch } from '../redux/hooks';
import logger from '../util/logger';

interface Props {
  children: ReactNode;
}

const UncaughtErrorHandler: FC<Props> = ({ children }) => {
  const defaultErrorHandler = ErrorUtils.getGlobalHandler();
  const dispatch = useAppDispatch();

  const myErrorHandler = (e: any, isFatal: any) => {
    if (isFatal) {
      logger.error(
        'Fatal error occurred while running app, trying to restart app',
        e,
      );
      dispatch(retryOnFailure());
      return;
    }
    logger.error(
      'Non-fatal uncaught error occurred, not catched only logged.',
      e,
    );
    defaultErrorHandler(e, isFatal);
  };

  ErrorUtils.setGlobalHandler(myErrorHandler);

  return <>{children}</>;
};

export default UncaughtErrorHandler;
