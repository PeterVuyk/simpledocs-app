import React, { FC, ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { scrollUp } from '../../redux/slice/scrollingSlice';

interface Props {
  children: ReactNode;
}

const ViewBottomTab: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(scrollUp());
    }, 400);
  }, [dispatch]);

  return <>{children}</>;
};

export default ViewBottomTab;
