import React, { FC, useCallback, useEffect, useState } from 'react';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import ArticlesList from './ArticlesList';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../model/articles/ArticleChapter';
import { BookTabInfo } from '../../../model/configurations/AppConfigurations';

interface Props {
  navigation: any;
  route: RouteProp<
    {
      params: {
        bookTabInfo: BookTabInfo;
        chapters: string[];
        bookType: string;
      };
    },
    'params'
  >;
}

const ArticleIntermediateListScreen: FC<Props> = ({ navigation, route }) => {
  const { bookType, chapters, bookTabInfo } = route.params;
  const [articleChapters, setArticleChapters] = useState<ArticleChapter[]>([]);
  const isFocused = useIsFocused();

  const handleLoadArticles = useCallback(() => {
    articleRepository.getChaptersByList(bookType, chapters, setArticleChapters);
  }, [bookType, chapters]);

  useEffect(() => {
    if (isFocused) {
      handleLoadArticles();
    }
    // Add 'isFocused' so if you go back you make sure new bookmarks are loaded as well
  }, [isFocused, bookType, chapters, handleLoadArticles]);

  if (!articleChapters) {
    return null;
  }

  return (
    <ArticlesList
      onReloadArticles={handleLoadArticles}
      bookTabInfo={bookTabInfo}
      showHeader={false}
      navigation={navigation}
      articleChapters={articleChapters}
      bookType={bookType}
    />
  );
};

export default ArticleIntermediateListScreen;
