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
        chapters: string[];
        articleType: string;
        tabInfo: TabInfo;
      };
    },
    'params'
  >;
}

const ArticleListScreen: FC<Props> = ({ navigation, route }) => {
  const { articleType, chapters, tabInfo } = route.params;
  const [articleChapters, setArticleChapters] = useState<ArticleChapter[]>([]);
  const [currentArticleType, setCurrentArticleType] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setCurrentArticleType(articleType ?? tabInfo.articleTypes[0].articleType);
  }, [tabInfo, articleType]);

  useEffect(() => {
    if (currentArticleType === null) {
      return;
    }
    if (chapters) {
      articleRepository.getChaptersByList(
        currentArticleType,
        chapters,
        setArticleChapters,
      );
      return;
    }
    articleRepository.getChapters(currentArticleType, setArticleChapters);
  }, [currentArticleType, chapters]);

  const getLevelsToShowInList = (): string[] | undefined =>
    chapters
      ? undefined
      : tabInfo.articleTypes.find(
          value => value.articleType === currentArticleType,
        )?.showLevelsInList;

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
