import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'native-base';
import globalStyle from '../../styling/globalStyle';
import articleRepository from '../../database/repository/articleRepository';
import { ArticleChapter } from '../../model/articles/ArticleChapter';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  iconStyle: {
    color: globalStyle.color.white,
    paddingBottom: 10,
  },
  tabTitle: {
    ...globalStyle.typography.h4,
    textAlign: 'center',
    color: globalStyle.color.white,
  },
});

interface Props {
  articleChapter: ArticleChapter;
  onClick: () => void;
}

const ToggleBookmarkViewButton: FC<Props> = ({ articleChapter, onClick }) => {
  const handleClick = () => {
    articleRepository.toggleBookmark(articleChapter).then(onClick);
  };
  return (
    <TouchableOpacity
      style={[
        { backgroundColor: articleChapter.bookmarked ? 'red' : 'green' },
        styles.container,
      ]}
      onPress={handleClick}
    >
      <Icon
        name={
          articleChapter.bookmarked
            ? 'bookmark-off-outline'
            : 'bookmark-plus-outline'
        }
        style={[styles.iconStyle]}
        type="MaterialCommunityIcons"
      />
      <Text style={styles.tabTitle}>
        {articleChapter.bookmarked ? 'Verwijderen' : 'Toevoegen'}
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleBookmarkViewButton;
