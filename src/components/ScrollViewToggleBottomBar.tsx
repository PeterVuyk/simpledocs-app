import React, { FC, ReactNode, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useAppDispatch } from '../redux/hooks';
import { scrollDown, scrollUp } from '../redux/slice/scrollingSlice';

interface Props {
  children: ReactNode;
  pageHeight?: number;
}

const ScrollViewToggleBottomBar: FC<Props> = ({ children, pageHeight }) => {
  const [oldOffset, setOldOffset] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(scrollUp());
    };
  }, [dispatch]);

  const handleScroll = (currentOffset: number) => {
    if (currentOffset < 1) {
      dispatch(scrollUp());
      return;
    }
    setOldOffset(currentOffset);
    if (currentOffset >= 0 && currentOffset !== 0) {
      if (currentOffset < oldOffset) {
        dispatch(scrollUp());
      } else {
        dispatch(scrollDown());
      }
    }
  };

  const getContentContainerStyle = pageHeight
    ? {
        flexGrow: 1,
        height: pageHeight,
      }
    : {};

  return (
    <ScrollView
      style={{ backgroundColor: '#fff' }}
      nestedScrollEnabled
      onScroll={event => {
        handleScroll(event.nativeEvent.contentOffset.y);
      }}
      scrollEventThrottle={1}
      contentContainerStyle={getContentContainerStyle}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollViewToggleBottomBar;
