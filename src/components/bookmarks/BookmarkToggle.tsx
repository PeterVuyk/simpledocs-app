import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { BlackPortal } from 'react-native-portal';
import { ArticleChapter } from '../../model/articles/ArticleChapter';
import articleRepository from '../../database/repository/articleRepository';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  buttonColor: {
    color: globalStyle.color.primary.main,
    padding: 10,
  },
});

interface Props {
  articleChapter: ArticleChapter;
}

const BookmarkToggle: FC<Props> = ({ articleChapter }) => {
  const [isBookmarked, setBookmarked] = useState<boolean>(
    articleChapter.bookmarked,
  );
  const handleBookmarkChapter = useCallback(() => {
    articleRepository.toggleBookmark(articleChapter).then(() => {
      articleChapter.bookmarked = !articleChapter.bookmarked;
      setBookmarked(articleChapter.bookmarked);
    });
  }, [articleChapter]);

  useEffect(() => {
    setBookmarked(articleChapter.bookmarked);
  }, [articleChapter.bookmarked]);

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
