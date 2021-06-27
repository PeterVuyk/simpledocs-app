import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import ArticlesList from '../ArticlesList';
import { Article } from '../../../model/Article';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleType } from '../../../model/ArticleType';

interface Props {
  navigation: any;
  route: RouteProp<
    {
      params: {
        articleType: ArticleType;
      };
    },
    'params'
  >;
}

const RegulationsScreen: FC<Props> = ({ navigation, route }) => {
  const { articleType } = route.params;
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    articleRepository.getParagraphs(articleType, setArticles);
  }, [articleType]);

  return (
    <>
      {articles && (
        <ArticlesList
          navigation={navigation}
          articles={articles}
          articleType={articleType}
        />
      )}
    </>
  );
};

export default RegulationsScreen;
