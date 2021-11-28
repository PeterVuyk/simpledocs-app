import React, { FC, ReactNode, useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { ArticleChapter } from '../../model/articles/ArticleChapter';
import ToggleBookmarkViewButton from './ToggleBookmarkViewButton';

interface Props {
  articleChapter: ArticleChapter;
  onToggle: () => void;
  children: ReactNode;
}

const SwipeableToggleBookmark: FC<Props> = ({
  articleChapter,
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
      ref={swipeableRef}
      renderRightActions={() => (
        <ToggleBookmarkViewButton
          articleChapter={articleChapter}
          onClick={handleToggle}
        />
      )}
    >
      {children}
    </Swipeable>
  );
};

export default SwipeableToggleBookmark;
