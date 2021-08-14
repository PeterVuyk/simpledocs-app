import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import WebView from 'react-native-webview';
import ArticlesList from './ArticlesList';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../model/ArticleChapter';
import { TabInfo } from '../../../model/ConfigInfo';

interface Props {
  navigation: any;
  route: RouteProp<
    {
      params: {
        tabInfo: TabInfo;
      };
    },
    'params'
  >;
}

const ArticleListScreen: FC<Props> = ({ navigation, route }) => {
  const { tabInfo } = route.params;
  const [articleChapters, setArticleChapters] = useState<ArticleChapter[]>([]);
  const [currentBookType, setCurrentBookType] = useState<string | null>(null);

  useEffect(() => {
    setCurrentBookType(tabInfo.bookTypes[0].bookType);
  }, [tabInfo]);

  useEffect(() => {
    if (currentBookType === null) {
      return;
    }
    articleRepository.getChapters(currentBookType, setArticleChapters);
  }, [currentBookType]);

  const getLevelsToShowInList = (): string[] | undefined =>
    tabInfo.bookTypes.find(value => value.bookType === currentBookType)
      ?.showLevelsInList;

  return (
    <>
      {articleChapters && currentBookType && (
        <ArticlesList
          showLevels={getLevelsToShowInList()}
          navigation={navigation}
          articleChapters={articleChapters}
          bookType={currentBookType}
        />
      )}
    </>
  );
};

export default ArticleListScreen;
