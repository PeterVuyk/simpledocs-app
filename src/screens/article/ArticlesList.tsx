import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ListItem from '../../components/ListItem';
import navigationHelper from '../../helper/navigationHelper';
import { ArticleChapter } from '../../model/ArticleChapter';
import articleTypeHelper from '../../helper/articleTypeHelper';
import { ARTICLE_TYPE_INSTRUCTION_MANUAL } from '../../model/ArticleType';

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
  const levelsForSeparateList = ['subHead', 'subSubSection'];

  const navigateArticleList = (chapters: string[]) => {
    if (
      articleTypeHelper.getTabByArticleType(articleType) ===
      ARTICLE_TYPE_INSTRUCTION_MANUAL
    ) {
      navigation.navigate('InstructionManualStack', {
        screen: 'InstructionManualIntermediateScreen',
        params: { articleType, chapters },
      });
      return;
    }
    navigation.navigate('RegulationsScreenStack', {
      screen: 'RegulationsIntermediateScreen',
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

  const clickHandler = (articleChapter: ArticleChapter) => {
    if (levelsForSeparateList.includes(articleChapter.level)) {
      navigateToDetailsScreen(articleChapter);
      return;
    }
    const index = articleChapters.indexOf(articleChapter, 0);
    const nextChapter = articleChapters[index + 1];
    if (
      nextChapter === undefined ||
      !levelsForSeparateList.includes(nextChapter.level)
    ) {
      navigateToDetailsScreen(articleChapter);
      return;
    }
    const nextChapters: ArticleChapter[] = [];
    nextChapters.push(articleChapters[index]);
    // eslint-disable-next-line no-restricted-syntax
    for (const chapter of articleChapters.slice(index + 1)) {
      if (!levelsForSeparateList.includes(chapter.level)) {
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
