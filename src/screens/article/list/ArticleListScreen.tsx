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
        bookType?: string;
      };
    },
    'params'
  >;
}

const ArticleListScreen: FC<Props> = ({ navigation, route }) => {
  const { tabInfo, bookType } = route.params;
  const [articleChapters, setArticleChapters] = useState<ArticleChapter[]>([]);
  const [currentBookType, setCurrentBookType] = useState<string | null>(null);

  useEffect(() => {
    setCurrentBookType(null);
    setCurrentBookType(bookType ?? tabInfo.bookTypes[0].bookType);
  }, [bookType, tabInfo]);

  useEffect(() => {
    if (currentBookType === null) {
      return;
    }
    articleRepository.getChapters(currentBookType, setArticleChapters);
  }, [bookType, currentBookType]);

  const getLevelsToShowInList = (): string[] | undefined =>
    tabInfo.bookTypes.find(value => value.bookType === currentBookType)
      ?.showLevelsInList;

  if (!currentBookType || !articleChapters) {
    return null;
  }
  return (
    <ArticlesList
      showHeader
      tabInfo={tabInfo}
      showLevels={getLevelsToShowInList()}
      navigation={navigation}
      articleChapters={articleChapters}
      bookType={currentBookType}
    />
  );
};

export default ArticleListScreen;
