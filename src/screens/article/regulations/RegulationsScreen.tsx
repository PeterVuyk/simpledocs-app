import React, { FC, useEffect, useState } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ArticlesList from '../ArticlesList';
import { Article } from '../../../model/Article';
import articleRepository from '../../../database/repository/articleRepository';
import { ARTICLE_TYPE_REGULATIONS } from '../../../model/ArticleType';

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const RegulationsScreen: FC<Props> = ({ navigation }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    articleRepository.getParagraphs(ARTICLE_TYPE_REGULATIONS, setArticles);
  }, []);

  return (
    <>
      {articles && (
        <ArticlesList
          navigation={navigation}
          articles={articles}
          articleType="regulations"
        />
      )}
    </>
  );
};

export default RegulationsScreen;
