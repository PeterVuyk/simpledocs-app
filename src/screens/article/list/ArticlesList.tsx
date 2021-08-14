import React, { FC, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ListItem from '../../../components/ListItem';
import navigationHelper from '../../../helper/navigationHelper';
import { ArticleChapter } from '../../../model/ArticleChapter';
import configHelper from '../../../helper/configHelper';
import { FIRST_BOOK_TAB } from '../../../model/BookTab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    flex: 1,
    paddingBottom: 60,
  },
});

interface Props {
  showLevels?: string[];
  navigation: DrawerNavigationProp<any>;
  articleChapters: ArticleChapter[];
  bookType: string;
}

const ArticlesList: FC<Props> = ({
  showLevels,
  navigation,
  articleChapters,
  bookType,
}) => {
  const navigateArticleList = useCallback(
    async (chapters: string[]) => {
      if ((await configHelper.getTabByBookType(bookType)) === FIRST_BOOK_TAB) {
        navigation.navigate('FirstBookTabStack', {
          screen: 'FirstBookTabIntermediateScreen',
          params: { bookType, chapters },
        });
        return;
      }
      navigation.navigate('SecondBookTabStack', {
        screen: 'SecondBookTabIntermediateScreen',
        params: { bookType, chapters },
      });
    },
    [bookType, navigation],
  );

  const navigateToDetailsScreen = useCallback(
    (articleChapter: ArticleChapter) => {
      navigationHelper.navigateToChapter(
        { articleChapter: articleChapter.chapter, bookType },
        bookType,
        navigation,
      );
    },
    [bookType, navigation],
  );

  const clickHandler = useCallback(
    async (articleChapter: ArticleChapter) => {
      const bookInfo = await configHelper.getConfigByBookType(bookType);
      if (
        showLevels === undefined ||
        bookInfo?.showLevelsInIntermediateList.includes(articleChapter.level)
      ) {
        navigateToDetailsScreen(articleChapter);
        return;
      }
      const index = articleChapters.indexOf(articleChapter, 0);
      const nextChapter = articleChapters[index + 1];
      if (
        nextChapter === undefined ||
        !bookInfo?.showLevelsInIntermediateList.includes(nextChapter.level)
      ) {
        navigateToDetailsScreen(articleChapter);
        return;
      }
      const nextChapters: ArticleChapter[] = [];
      nextChapters.push(articleChapters[index]);
      // eslint-disable-next-line no-restricted-syntax
      for (const chapter of articleChapters.slice(index + 1)) {
        if (!bookInfo?.showLevelsInIntermediateList.includes(chapter.level)) {
          break;
        }
        nextChapters.push(chapter);
      }
      navigateArticleList(nextChapters.map(chapter => chapter.chapter));
    },
    [
      articleChapters,
      bookType,
      navigateArticleList,
      navigateToDetailsScreen,
      showLevels,
    ],
  );

  const getChapters = () => {
    if (!showLevels) {
      return articleChapters;
    }
    return articleChapters.filter(chapter =>
      showLevels.includes(chapter.level),
    );
  };

  const renderItem = useCallback(
    (item: ArticleChapter) => (
      <ListItem
        title={item.title}
        subTitle={item.subTitle}
        iconFile={item.iconFile}
        onSubmit={() => clickHandler(item)}
      />
    ),
    [clickHandler],
  );

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          keyExtractor={item => item.chapter.toString()}
          data={getChapters()}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    </View>
  );
};

export default ArticlesList;
