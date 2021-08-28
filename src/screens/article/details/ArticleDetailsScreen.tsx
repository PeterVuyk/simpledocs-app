import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../model/ArticleChapter';
import ArticleDetails from './ArticleDetails';
import Header from '../../../navigation/header/Header';

interface Props {
  navigation: DrawerNavigationHelpers;
  route: RouteProp<
    {
      params: {
        articleChapter: string;
        bookType: string;
      };
    },
    'params'
  >;
}

const ArticleDetailsScreen: FC<Props> = ({ navigation, route }) => {
  const [chapters, setChapters] = useState<ArticleChapter[]>([]);
  const { articleChapter, bookType } = route.params;

  useEffect(() => {
    setChapters([]);
    articleRepository.getChapters(bookType, setChapters);
  }, [bookType, navigation]);

  return (
    <>
      <Header navigation={navigation} showListButtonFromBookType={bookType} />
      {chapters.length !== 0 && (
        <ArticleDetails
          bookType={bookType}
          articleChapterList={chapters}
          articleChapter={articleChapter}
        />
      )}
    </>
  );
};

export default ArticleDetailsScreen;
