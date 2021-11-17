import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { Dimensions } from 'react-native';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../model/articles/ArticleChapter';
import ArticleDetails from './ArticleDetails';

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
  const window = Dimensions.get('window');
  const [chapters, setChapters] = useState<ArticleChapter[]>([]);
  const { articleChapter, bookType } = route.params;
  const [dimensions, setDimensions] = useState({ window });
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = ({ window }) => {
    setLoading(true);
    setDimensions({ window });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setChapters([]);
    setDimensions({ window });
    setLoading(false);
    articleRepository.getChapters(bookType, setChapters);
  }, [bookType, navigation, window]);

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  return (
    <>
      {!loading && chapters.length !== 0 && (
        <ArticleDetails
          windowWidth={dimensions.window}
          bookType={bookType}
          articleChapterList={chapters}
          articleChapter={articleChapter}
        />
      )}
    </>
  );
};

export default ArticleDetailsScreen;
