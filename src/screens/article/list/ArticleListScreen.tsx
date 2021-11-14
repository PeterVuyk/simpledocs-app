import React, { FC, useEffect, useState } from 'react';
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
        bookType?: string;
      };
    },
    'params'
  >;
}

const ArticleListScreen: FC<Props> = ({ navigation, route }) => {
  const { bookTabInfo, bookType } = route.params;
  const [articleChapters, setArticleChapters] = useState<ArticleChapter[]>([]);
  const [currentBookType, setCurrentBookType] = useState<string | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    setCurrentBookType(null);
    setCurrentBookType(bookType ?? bookTabInfo.bookTypes[0].bookType);
  }, [bookType, bookTabInfo]);

  useEffect(() => {
    let isMounted = true;

    if (currentBookType !== null) {
      articleRepository.getChapters(
        currentBookType,
        (chapters: ArticleChapter[]) => {
          if (isMounted) {
            setArticleChapters(chapters);
          }
        },
      );
    }
    return () => {
      isMounted = false;
    };
    // Add 'isFocused' so if you go back you make sure new bookmarks are loaded as well
  }, [isFocused, bookType, currentBookType]);

  const getChapterDivisionsToShowInList = (): string[] | undefined =>
    bookTabInfo.bookTypes.find(value => value.bookType === currentBookType)
      ?.chapterDivisionsInList;

  if (!currentBookType || !articleChapters) {
    return null;
  }
  return (
    <ArticlesList
      showHeader
      bookTabInfo={bookTabInfo}
      showChapterDivisions={getChapterDivisionsToShowInList()}
      navigation={navigation}
      articleChapters={articleChapters}
      bookType={currentBookType}
    />
  );
};

export default ArticleListScreen;
