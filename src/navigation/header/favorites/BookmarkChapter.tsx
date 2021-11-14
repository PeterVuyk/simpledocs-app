import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';
import { ArticleChapter } from '../../../model/articles/ArticleChapter';
import articleRepository from '../../../database/repository/articleRepository';

const styles = StyleSheet.create({
  buttonColor: {
    color: '#154594',
    padding: 10,
  },
});

interface Props {
  articleChapter: ArticleChapter;
}

const BookmarkChapter: FC<Props> = ({ articleChapter }) => {
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
    <View>
      <Icon
        style={styles.buttonColor}
        name={isBookmarked ? 'bookmark-check' : 'bookmark-plus-outline'}
        type="MaterialCommunityIcons"
        fontSize={26}
        onPress={handleBookmarkChapter}
      />
    </View>
  );
};

export default BookmarkChapter;
