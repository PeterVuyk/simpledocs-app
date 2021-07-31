import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
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
  const [currentArticleType, setCurrentArticleType] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setCurrentArticleType(tabInfo.articleTypes[0].articleType);
  }, [tabInfo]);

  useEffect(() => {
    if (currentArticleType === null) {
      return;
    }
    articleRepository.getChapters(currentArticleType, setArticleChapters);
  }, [currentArticleType]);

  const getLevelsToShowInList = (): string[] | undefined =>
    tabInfo.articleTypes.find(value => value.articleType === currentArticleType)
      ?.showLevelsInList;

  return (
    <>
      {articleChapters && currentArticleType && (
        <ArticlesList
          showLevels={getLevelsToShowInList()}
          navigation={navigation}
          articleChapters={articleChapters}
          articleType={currentArticleType}
        />
      )}
    </>
  );
};

export default ArticleListScreen;
