import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../model/articles/ArticleChapter';
import ArticleDetails from './ArticleDetails';
import DimensionsProvider from '../../../components/viewer/DimensionsProvider';

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
    articleRepository.getChapters(bookType, setChapters);
  }, [bookType, navigation]);

  return (
    <>
      {chapters.length !== 0 && (
        <DimensionsProvider
          children={window => (
            <ArticleDetails
              articleChapter={articleChapter}
              bookType={bookType}
              articleChapterList={chapters}
              windowWidth={window}
            />
          )}
        />
      )}
    </>
  );
};

export default ArticleDetailsScreen;
