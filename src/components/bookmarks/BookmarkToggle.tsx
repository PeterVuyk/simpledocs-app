import React, { FC, useCallback, useEffect, useState } from 'react';
import { Icon } from 'native-base';
import { BlackPortal } from 'react-native-portal';
import { useIsFocused } from '@react-navigation/native';
import { InfoBookPage } from '../../model/bookPages/InfoBookPage';
import bookPagesRepository from '../../database/repository/bookPagesRepository';
import globalStyle from '../../styling/globalStyle';
import getFamilyIcon from '../getFamilyIcon';

interface Props {
  infoBookPage: InfoBookPage;
}

const BookmarkToggle: FC<Props> = ({ infoBookPage }) => {
  const [isBookmarked, setBookmarked] = useState<boolean>(
    infoBookPage.bookmarked,
  );
  const isFocused = useIsFocused();
  const handleBookmarkChapter = useCallback(() => {
    bookPagesRepository.toggleBookmark(infoBookPage).then(() => {
      infoBookPage.bookmarked = !infoBookPage.bookmarked;
      setBookmarked(infoBookPage.bookmarked);
    });
  }, [infoBookPage]);

  useEffect(() => {
    setBookmarked(infoBookPage.bookmarked);
  }, [infoBookPage.bookmarked]);

  if (!isFocused) {
    return null;
  }

  return (
    <BlackPortal name="bookmarkToggle">
      <Icon
        size="7"
        color={globalStyle.color.primary.main}
        style={{ margin: 10 }}
        as={getFamilyIcon(
          'MaterialCommunityIcons',
          isBookmarked ? 'bookmark-check' : 'bookmark-plus-outline',
        )}
        onPress={handleBookmarkChapter}
      />
    </BlackPortal>
  );
};

export default BookmarkToggle;
