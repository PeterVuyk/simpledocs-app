import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import articleRepository from '../../database/repository/articleRepository';
import { ArticleChapter } from '../../model/ArticleChapter';
import ArticleDetails from './ArticleDetails';
import { ArticleType } from '../../model/ArticleType';
import Header from '../../navigation/header/Header';

interface Props {
  navigation: DrawerNavigationHelpers;
  route: RouteProp<
    {
      params: {
        articleChapter: string;
        articleType: ArticleType;
      };
    },
    'params'
  >;
}

const ArticleDetailsScreen: FC<Props> = ({ navigation, route }) => {
  const [chapters, setChapters] = useState<ArticleChapter[]>([]);
  const { articleChapter, articleType } = route.params;

  useEffect(() => {
    articleRepository.getChapters(articleType, setChapters);
  }, [articleType, navigation]);

  return (
    <>
      <Header
        navigation={navigation}
        showListButtonFromArticleType={articleType}
      />
      {chapters.length !== 0 && (
        <ArticleDetails
          articleType={articleType}
          articleChapterList={chapters}
          articleChapter={articleChapter}
        />
      )}
    </>
  );
};

export default ArticleDetailsScreen;
