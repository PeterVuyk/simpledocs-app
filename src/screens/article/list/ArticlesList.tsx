import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ListItem from '../../../components/ListItem';
import navigationHelper from '../../../helper/navigationHelper';
import { ArticleChapter } from '../../../model/ArticleChapter';
import configHelper from '../../../helper/configHelper';
import { FIRST_ARTICLE_TAB } from '../../../model/ArticleTab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
});

interface Props {
  showLevels?: string[];
  navigation: DrawerNavigationProp<any>;
  articleChapters: ArticleChapter[];
  articleType: string;
}

const ArticlesList: FC<Props> = ({
  showLevels,
  navigation,
  articleChapters,
  articleType,
}) => {
  const navigateArticleList = async (chapters: string[]) => {
    if (
      (await configHelper.getTabByArticleType(articleType)) ===
      FIRST_ARTICLE_TAB
    ) {
      navigation.navigate('FirstArticleTabStack', {
        screen: 'FirstArticleTabIntermediateScreen',
        params: { articleType, chapters },
      });
      return;
    }
    navigation.navigate('SecondArticleTabStack', {
      screen: 'SecondArticleTabIntermediateScreen',
      params: { articleType, chapters },
    });
  };

  const navigateToDetailsScreen = (articleChapter: ArticleChapter) => {
    navigationHelper.navigateToChapter(
      { articleChapter: articleChapter.chapter, articleType },
      articleType,
      navigation,
    );
  };

  const clickHandler = async (articleChapter: ArticleChapter) => {
    const articleInfo = await configHelper.getConfigByArticleType(articleType);
    if (
      showLevels === undefined ||
      articleInfo?.showLevelsInIntermediateList.includes(articleChapter.level)
    ) {
      navigateToDetailsScreen(articleChapter);
      return;
    }
    const index = articleChapters.indexOf(articleChapter, 0);
    const nextChapter = articleChapters[index + 1];
    if (
      nextChapter === undefined ||
      !articleInfo?.showLevelsInIntermediateList.includes(nextChapter.level)
    ) {
      navigateToDetailsScreen(articleChapter);
      return;
    }
    const nextChapters: ArticleChapter[] = [];
    nextChapters.push(articleChapters[index]);
    // eslint-disable-next-line no-restricted-syntax
    for (const chapter of articleChapters.slice(index + 1)) {
      if (!articleInfo?.showLevelsInIntermediateList.includes(chapter.level)) {
        break;
      }
      nextChapters.push(chapter);
    }
    navigateArticleList(nextChapters.map(chapter => chapter.chapter));
  };

  const getChapters = () => {
    if (!showLevels) {
      return articleChapters;
    }
    return articleChapters.filter(chapter =>
      showLevels.includes(chapter.level),
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.chapter.toString()}
        data={getChapters()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.subTitle}
            iconFile={item.iconFile}
            onSubmit={() => clickHandler(item)}
          />
        )}
      />
    </View>
  );
};

export default ArticlesList;
