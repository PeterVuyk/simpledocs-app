import React, { FC, ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useUpdateAggregates from './useUpdateAggregates';
import {
  STARTUP_FAILURE_STATE,
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
  const { isAggregatesUpdated, updateAggregates } = useUpdateAggregates();
  const currentStartupState = useAppSelector(
    state => state.startupState.currentState,
  );

  useEffect(() => {
    if (currentStartupState === UPDATE_AGGREGATES_STATE) {
      updateAggregates();
    }
  }, [currentStartupState, dispatch, updateAggregates]);

  useEffect(() => {
    if (!isAggregatesUpdated) {
      return;
    }
    const isUpdated = async () => {
      dispatch(
        updateStartupState({
          currentState: await configurationsDAO
            .isStartupSuccessful()
            .then(success =>
              success ? STARTUP_SUCCESSFUL_STATE : STARTUP_FAILURE_STATE,
            ),
        }),
      );
    };
    isUpdated();
  }, [dispatch, isAggregatesUpdated]);

  return <>{children}</>;
};

export default AggregateDataProvider;
