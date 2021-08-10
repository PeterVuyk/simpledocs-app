import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import ArticlesList from './ArticlesList';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../model/ArticleChapter';

interface Props {
  navigation: any;
  route: RouteProp<
    {
      params: {
        chapters: string[];
        bookType: string;
      };
    },
    'params'
  >;
}

const ArticleIntermediateListScreen: FC<Props> = ({ navigation, route }) => {
  const { bookType, chapters } = route.params;
  const [articleChapters, setArticleChapters] = useState<ArticleChapter[]>([]);

  useEffect(() => {
    articleRepository.getChaptersByList(bookType, chapters, setArticleChapters);
  }, [bookType, chapters]);

  if (!articleChapters) {
    return null;
  }

  return (
    <ArticlesList
      navigation={navigation}
      articleChapters={articleChapters}
      bookType={bookType}
    />
  );
};

export default ArticleIntermediateListScreen;
