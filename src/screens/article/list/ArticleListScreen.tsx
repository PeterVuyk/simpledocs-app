import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import ArticlesList from './ArticlesList';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../model/ArticleChapter';
import { ArticlesInfo } from '../../../model/ArticlesInfo';

interface Props {
  navigation: any;
  route: RouteProp<
    {
      params: {
        chapters: string[];
        articleType: string;
        articlesInfo: ArticlesInfo;
      };
    },
    'params'
  >;
}

const ArticleListScreen: FC<Props> = ({ navigation, route }) => {
  const { articleType, chapters, articlesInfo } = route.params;
  const [articleChapters, setArticleChapters] = useState<ArticleChapter[]>([]);
  const [currentArticleType, setCurrentArticleType] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setCurrentArticleType(
      articleType ?? articlesInfo.articleTypes[0].articleType,
    );
  }, [articlesInfo, articleType]);

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

  return (
    <>
      {articleChapters && currentArticleType && (
        <ArticlesList
          showLevels={
            chapters ? undefined : ['chapter', 'section', 'subSection']
          }
          navigation={navigation}
          articleChapters={articleChapters}
          articleType={currentArticleType}
        />
      )}
    </>
  );
};

export default ArticleListScreen;
