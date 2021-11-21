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
    backgroundColor: 'red',
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

const RemoveBookmarkView: FC<Props> = ({ articleChapter, onClick }) => {
  const handleClick = () => {
    articleRepository.toggleBookmark(articleChapter).then(onClick);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <Icon
        name="bookmark-off-outline"
        style={styles.iconStyle}
        type="MaterialCommunityIcons"
      />
      <Text style={styles.tabTitle}>Verwijderen</Text>
    </TouchableOpacity>
  );
};

export default RemoveBookmarkView;
