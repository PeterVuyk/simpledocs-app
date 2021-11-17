import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'native-base';
import { BlackPortal } from 'react-native-portal';
import { ArticleChapter } from '../../model/articles/ArticleChapter';
import articleRepository from '../../database/repository/articleRepository';

const styles = StyleSheet.create({
  buttonColor: {
    color: '#154594',
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
  const handleBookmarkChapter = () => {
    articleRepository.toggleBookmark(articleChapter).then(() => {
      articleChapter.bookmarked = !articleChapter.bookmarked;
      setBookmarked(articleChapter.bookmarked);
    });
  };

  useEffect(() => {
    setBookmarked(articleChapter.bookmarked);
  }, [articleChapter.bookmarked]);

  return (
    <BlackPortal name="bookmarkToggle">
      <Icon
        style={styles.buttonColor}
        name={isBookmarked ? 'bookmark-check' : 'bookmark-plus-outline'}
        type="MaterialCommunityIcons"
        fontSize={26}
        onPress={handleBookmarkChapter}
      />
    </BlackPortal>
  );
};

export default BookmarkToggle;
