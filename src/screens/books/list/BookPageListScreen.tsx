import React, { FC, useEffect, useState } from 'react';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import BookPagesList from './BookPagesList';
import bookPagesRepository from '../../../database/repository/bookPagesRepository';
import { InfoBookPage } from '../../../model/bookPages/InfoBookPage';
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

const BookPageListScreen: FC<Props> = ({ navigation, route }) => {
  const { bookTabInfo, bookType } = route.params;
  const [infoBookPages, setInfoBookPages] = useState<InfoBookPage[]>([]);
  const [currentBookType, setCurrentBookType] = useState<string | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    setCurrentBookType(null);
    setCurrentBookType(bookType ?? bookTabInfo.bookTypes[0].bookType);
  }, [bookType, bookTabInfo]);

  const handleReloadPages = () => {
    if (!currentBookType) {
      return;
    }
    bookPagesRepository.getChapters(
      currentBookType,
      (chapters: InfoBookPage[]) => {
        setInfoBookPages(chapters);
      },
    );
  };

  useEffect(() => {
    let isMounted = true;

    if (currentBookType !== null && isFocused) {
      bookPagesRepository.getChapters(
        currentBookType,
        (chapters: InfoBookPage[]) => {
          if (isMounted) {
            setInfoBookPages(chapters);
          }
        },
      );
    }
    return () => {
      isMounted = false;
    };
    // Add 'isFocused' so if you go back you make sure new bookmarks are loaded as well
  }, [isFocused, bookType, currentBookType]);

  const getChapterDivisionsToShowInList = (): string[] | undefined => {
    return bookTabInfo.bookTypes.find(
      value => value.bookType === currentBookType,
    )?.chapterDivisionsInList;
  };

  if (!currentBookType || !infoBookPages) {
    return null;
  }
  return (
    <BookPagesList
      showHeader
      bookTabInfo={bookTabInfo}
      showChapterDivisions={getChapterDivisionsToShowInList()}
      navigation={navigation}
      InfoBookPages={infoBookPages}
      onReloadPages={handleReloadPages}
      bookType={currentBookType}
    />
  );
};

export default BookPageListScreen;
