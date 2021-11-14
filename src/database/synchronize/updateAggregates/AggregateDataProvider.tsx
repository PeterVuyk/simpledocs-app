import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useUpdateAggregates from './useUpdateAggregates';
import {
  retryOnFailure,
  STARTUP_SUCCESSFUL_STATE,
  UPDATE_AGGREGATES_STATE,
  updateStartupState,
} from '../../../redux/slice/startupStateSlice';
import configurationsHelper from '../../../helper/configurationsHelper';

interface Props {
  children: ReactNode;
}

const AggregateDataProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { updateAggregates } = useUpdateAggregates();
  const { currentState } = useAppSelector(state => state.startupState);
  const { bookmarks } = useAppSelector(state => state.bookmarkState);

  const handleUpdateAggregates = useCallback(async () => {
    await updateAggregates(bookmarks).then(async () => {
      const isStartupSuccessful =
        await configurationsHelper.isStartupSuccessful();
      if (isStartupSuccessful) {
        dispatch(updateStartupState(STARTUP_SUCCESSFUL_STATE));
        return;
      }
      dispatch(retryOnFailure());
    });
  }, [bookmarks, dispatch, updateAggregates]);

  useEffect(() => {
    if (currentState === UPDATE_AGGREGATES_STATE) {
      handleUpdateAggregates();
    }
  }, [currentState, dispatch, handleUpdateAggregates, updateAggregates]);

  return <>{children}</>;
};

export default AggregateDataProvider;
