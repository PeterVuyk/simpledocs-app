import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import ArticlesList from './ArticlesList';
import articleRepository from '../../../database/repository/articleRepository';
import { ArticleChapter } from '../../../model/ArticleChapter';
import { TabInfo } from '../../../model/AppConfigurations';

interface Props {
  navigation: any;
  route: RouteProp<
    {
      params: {
        tabInfo: TabInfo;
        chapters: string[];
        bookType: string;
      };
    },
    'params'
  >;
}

const ArticleIntermediateListScreen: FC<Props> = ({ navigation, route }) => {
  const { bookType, chapters, tabInfo } = route.params;
  const [articleChapters, setArticleChapters] = useState<ArticleChapter[]>([]);

  useEffect(() => {
    articleRepository.getChaptersByList(bookType, chapters, setArticleChapters);
  }, [bookType, chapters]);

  if (!articleChapters) {
    return null;
  }

  return (
    <ArticlesList
      tabInfo={tabInfo}
      showHeader={false}
      navigation={navigation}
      articleChapters={articleChapters}
      bookType={bookType}
    />
  );
};

export default ArticleIntermediateListScreen;
