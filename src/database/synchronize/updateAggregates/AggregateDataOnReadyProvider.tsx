import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useUpdateAggregates from './useUpdateAggregates';
import internetConnectivity from '../../../helper/internetConnectivity';
import { UPDATE_ON_STARTUP_READY } from '../../../model/UpdateMoment';

interface Props {
  children: ReactNode;
}

const AggregateDataOnReadyProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { updateAggregates } = useUpdateAggregates();
  const { bookmarks } = useAppSelector(state => state.bookmarkState);

  const handleUpdateAggregates = useCallback(async () => {
    if (!(await internetConnectivity.hasInternetConnection())) {
      return Promise.resolve();
    }
    return updateAggregates(bookmarks, UPDATE_ON_STARTUP_READY);
  }, [bookmarks, updateAggregates]);

  useEffect(() => {
    handleUpdateAggregates();
  }, [dispatch, handleUpdateAggregates, updateAggregates]);

  return <>{children}</>;
};

export default AggregateDataOnReadyProvider;
