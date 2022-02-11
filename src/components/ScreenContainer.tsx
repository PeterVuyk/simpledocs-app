import React, { FC, ReactNode, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { scrollUp } from '../redux/slice/scrollingSlice';
import { useAppDispatch } from '../redux/hooks';

interface Props {
  children: ReactNode;
}

/**
 * If the user clicks on a tab while the tab is hiding, then we need to make sure the tab is visible again.
 */
const ScreenContainer: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Timeout to make sure navigation is successful before we show the bottom bar again.
    setTimeout(() => dispatch(scrollUp()), 1000);
  }, [dispatch, isFocused]);

  return <>{children}</>;
};

export default ScreenContainer;
