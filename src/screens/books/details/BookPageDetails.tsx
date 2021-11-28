import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, ScaledSize } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { InfoBookPage } from '../../../model/bookPages/InfoBookPage';
import { NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP } from '../../../model/notifications/NotificationType';
import BookChapterNavigator from '../BookChapterNavigator';
import useNotification from '../../../components/notification/useNotification';
import BookmarkToggle from '../../../components/bookmarks/BookmarkToggle';
import BookPageDetailsPage from './BookPageDetailsPage';

interface Props {
  bookPageChapter: string;
  bookType: string;
  infoBookPages: InfoBookPage[];
  windowWidth: ScaledSize;
}

const BookPageDetails: FC<Props> = ({
  bookPageChapter,
  infoBookPages,
  bookType,
  windowWidth,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>();
  const { notify } = useNotification();
  const isFocused = useIsFocused();

  const handleBookPageNavigation = useCallback(
    (chapter: string) => {
      const index = infoBookPages.map(value => value.chapter).indexOf(chapter);
      setCurrentIndex(index === -1 ? 1 : index);
    },
    [infoBookPages],
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      notify(NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP);
    }
    return () => {
      isMounted = false;
    };
  }, [notify]);

  useEffect(() => {
    const index = infoBookPages
      .map(value => value.chapter)
      .indexOf(bookPageChapter);
    setCurrentIndex(index === -1 ? 1 : index);
  }, [bookPageChapter, infoBookPages, handleBookPageNavigation]);

  const onPageChange = (chapter: string): void => {
    setCurrentIndex(infoBookPages.map(value => value.chapter).indexOf(chapter));
  };

  return (
    <View style={{ flex: 1 }}>
      {isFocused && currentIndex !== undefined && (
        <>
          <BookmarkToggle infoBookPage={infoBookPages[currentIndex]} />
          <BookChapterNavigator
            onPageChange={onPageChange}
            infoBookPages={infoBookPages}
            currentChapter={infoBookPages[currentIndex].chapter}
          />
          <BookPageDetailsPage
            currentChapter={infoBookPages[currentIndex].chapter}
            bookType={bookType}
            infoBookPages={infoBookPages}
            windowWidth={windowWidth}
            onPageChange={onPageChange}
          />
        </>
      )}
    </View>
  );
};

export default BookPageDetails;
