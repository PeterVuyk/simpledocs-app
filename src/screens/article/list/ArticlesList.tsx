import React, { FC, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ListItem from '../../../components/ListItem';
import { ArticleChapter } from '../../../model/ArticleChapter';
import configHelper from '../../../helper/configHelper';
import { FIRST_BOOK_TAB } from '../../../model/BookTab';
import useContentNavigator from '../../../components/hooks/useContentNavigator';
import TitleBar from '../../../components/TitleBar';
import { TabInfo } from '../../../model/AppConfigurations';

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
  tabInfo: TabInfo;
  showHeader: boolean;
  showChapterDivisions?: string[];
  navigation: DrawerNavigationProp<any>;
  articleChapters: ArticleChapter[];
  bookType: string;
}

const ArticlesList: FC<Props> = ({
  tabInfo,
  showHeader,
  showChapterDivisions,
  navigation,
  articleChapters,
  bookType,
}) => {
  const { navigateToChapter } = useContentNavigator();
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
      navigateToChapter(
        { articleChapter: articleChapter.chapter, bookType },
        bookType,
      );
    },
    [bookType, navigateToChapter],
  );

  const handleItemClick = useCallback(
    async (articleChapter: ArticleChapter) => {
      const bookInfo = await configHelper.getConfigByBookType(bookType);
      if (
        showChapterDivisions === undefined ||
        bookInfo?.chapterDivisionsInIntermediateList.includes(
          articleChapter.chapterDivision,
        )
      ) {
        navigateToDetailsScreen(articleChapter);
        return;
      }
      const index = articleChapters.indexOf(articleChapter, 0);
      const nextChapter = articleChapters[index + 1];
      if (
        nextChapter === undefined ||
        !bookInfo?.chapterDivisionsInIntermediateList.includes(
          nextChapter.chapterDivision,
        )
      ) {
        navigateToDetailsScreen(articleChapter);
        return;
      }
      const nextChapters: ArticleChapter[] = [];
      nextChapters.push(articleChapters[index]);
      for (const chapter of articleChapters.slice(index + 1)) {
        if (
          !bookInfo?.chapterDivisionsInIntermediateList.includes(
            chapter.chapterDivision,
          )
        ) {
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
      showChapterDivisions,
    ],
  );

  const getChapters = () => {
    if (!showChapterDivisions) {
      return articleChapters;
    }
    return articleChapters.filter(chapter =>
      showChapterDivisions.includes(chapter.chapterDivision),
    );
  };

  const renderItem = useCallback(
    (item: ArticleChapter) => (
      <ListItem
        title={item.title}
        subTitle={item.subTitle}
        iconFile={item.iconFile}
        onSubmit={() => handleItemClick(item)}
      />
    ),
    [handleItemClick],
  );

  const getHeader = () => {
    if (!showHeader) {
      return <></>;
    }
    const bookInfo = tabInfo.bookTypes.find(
      value => value.bookType === bookType,
    );
    if (!bookInfo) {
      return <></>;
    }
    return (
      <TitleBar title={bookInfo.title} subTitle={bookInfo.subTitle ?? ''} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          ListHeaderComponent={getHeader}
          keyExtractor={item => item.chapter.toString()}
          data={getChapters()}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    </View>
  );
};

export default ArticlesList;
