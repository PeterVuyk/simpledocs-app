import React, { FC, ReactNode, useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { InfoBookPage } from '../../model/bookPages/InfoBookPage';
import ToggleBookmarkViewButton from './ToggleBookmarkViewButton';

interface Props {
  infoBookPage: InfoBookPage;
  onToggle: () => void;
  children: ReactNode;
}

const SwipeableToggleBookmark: FC<Props> = ({
  infoBookPage,
  onToggle,
  children,
}) => {
  const swipeableRef = useRef<Swipeable>(null);

  const handleToggle = () => {
    swipeableRef.current?.close();
    onToggle();
  };

  return (
    <Swipeable
      hitSlop={{ left: -50 }}
      ref={swipeableRef}
      renderRightActions={() => (
        <ToggleBookmarkViewButton
          infoBookPage={infoBookPage}
          onClick={handleToggle}
        />
      )}
    >
      {children}
    </Swipeable>
  );
};

export default SwipeableToggleBookmark;
