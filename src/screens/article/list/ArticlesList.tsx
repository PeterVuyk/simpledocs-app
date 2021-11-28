import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { ArticleChapter } from '../../../model/articles/ArticleChapter';
import TitleBar from '../../../components/titleBar/TitleBar';
import { BookTabInfo } from '../../../model/configurations/AppConfigurations';
import globalStyle from '../../../styling/globalStyle';
import ArticlesListItem from './ArticlesListItem';

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: globalStyle.color.white,
  },
  flatListContainer: {
    flex: 1,
    paddingBottom: 60,
  },
});

interface Props {
  bookTabInfo: BookTabInfo;
  showHeader: boolean;
  showChapterDivisions?: string[];
  navigation: DrawerNavigationProp<any>;
  articleChapters: ArticleChapter[];
  onReloadArticles: () => void;
  bookType: string;
}

const ArticlesList: FC<Props> = ({
  bookTabInfo,
  showHeader,
  showChapterDivisions,
  navigation,
  articleChapters,
  onReloadArticles,
  bookType,
}) => {
  const getChapters = () => {
    if (!showChapterDivisions) {
      return articleChapters;
    }
    return articleChapters.filter(chapter =>
      showChapterDivisions.includes(chapter.chapterDivision),
    );
  };

  const getHeader = () => {
    if (!showHeader) {
      return <></>;
    }
    const bookInfo = bookTabInfo.bookTypes.find(
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
    <View style={styles.tabContainer}>
      <View style={styles.flatListContainer}>
        <FlatList
          ListHeaderComponent={getHeader}
          keyExtractor={item => item.chapter.toString()}
          extraData={getChapters()}
          data={getChapters()}
          renderItem={({ item }) => (
            <ArticlesListItem
              showChapterDivisions={showChapterDivisions}
              articleChapter={item}
              articleChapters={articleChapters}
              navigation={navigation}
              onReloadArticles={onReloadArticles}
              bookType={bookType}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ArticlesList;
