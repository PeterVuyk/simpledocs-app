import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { BlackPortal } from 'react-native-portal';
import { useIsFocused } from '@react-navigation/native';
import { InfoBookPage } from '../../model/bookPages/InfoBookPage';
import bookPagesRepository from '../../database/repository/bookPagesRepository';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  buttonColor: {
    color: globalStyle.color.primary.main,
    padding: 10,
  },
});

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
        style={styles.buttonColor}
        name={isBookmarked ? 'bookmark-check' : 'bookmark-plus-outline'}
        type="MaterialCommunityIcons"
        onPress={handleBookmarkChapter}
      />
    </BlackPortal>
  );
};

export default BookmarkToggle;
