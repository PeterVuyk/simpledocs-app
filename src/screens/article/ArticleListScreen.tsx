import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import ArticlesList from './ArticlesList';
import articleRepository from '../../database/repository/articleRepository';
import { ArticleChapter } from '../../model/ArticleChapter';

interface Props {
  navigation: any;
  route: RouteProp<
    {
      params: {
        chapters?: string[];
        articleType: string;
      };
    },
    'params'
  >;
}

const ArticleListScreen: FC<Props> = ({ navigation, route }) => {
  const { articleType, chapters } = route.params;
  const [articleChapters, setArticleChapters] = useState<ArticleChapter[]>([]);

  useEffect(() => {
    if (chapters) {
      articleRepository.getChaptersByList(
        articleType,
        chapters,
        setArticleChapters,
      );
      return;
    }
    articleRepository.getChapters(articleType, setArticleChapters);
  }, [articleType, chapters]);

  return (
    <>
      {articleChapters && (
        <ArticlesList
          showLevels={
            chapters ? undefined : ['chapter', 'section', 'subSection']
          }
          navigation={navigation}
          articleChapters={articleChapters}
          articleType={articleType}
        />
      )}
    </>
  );
};

export default ArticleListScreen;
