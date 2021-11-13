import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useUpdateAggregates from './useUpdateAggregates';
import {
  retryOnFailure,
  STARTUP_SUCCESSFUL_STATE,
  UPDATE_AGGREGATES_STATE,
  updateStartupState,
} from '../../../redux/slice/startupStateSlice';
import configurationsDAO from '../../../configurations/configurationsDAO';

interface Props {
  children: ReactNode;
}

const AggregateDataProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { updateAggregates } = useUpdateAggregates();
  const currentStartupState = useAppSelector(
    state => state.startupState.currentState,
  );

  const handleUpdateAggregates = useCallback(async () => {
    await updateAggregates().then(async () => {
      const isStartupSuccessful = await configurationsDAO.isStartupSuccessful();
      if (isStartupSuccessful) {
        dispatch(updateStartupState(STARTUP_SUCCESSFUL_STATE));
        return;
      }
      dispatch(retryOnFailure());
    });
  }, [dispatch, updateAggregates]);

  useEffect(() => {
    if (currentStartupState === UPDATE_AGGREGATES_STATE) {
      handleUpdateAggregates();
    }
  }, [currentStartupState, dispatch, handleUpdateAggregates, updateAggregates]);

  return <>{children}</>;
};

export default AggregateDataProvider;
