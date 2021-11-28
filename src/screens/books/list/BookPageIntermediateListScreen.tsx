import React, { FC, useCallback, useEffect, useState } from 'react';
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
        chapters: string[];
        bookType: string;
      };
    },
    'params'
  >;
}

const BookPageIntermediateListScreen: FC<Props> = ({ navigation, route }) => {
  const { bookType, chapters, bookTabInfo } = route.params;
  const [infoBookPages, setInfoBookPages] = useState<InfoBookPage[]>([]);
  const isFocused = useIsFocused();

  const handleLoadPages = useCallback(() => {
    bookPagesRepository.getChaptersByList(bookType, chapters, setInfoBookPages);
  }, [bookType, chapters]);

  useEffect(() => {
    if (isFocused) {
      handleLoadPages();
    }
    // Add 'isFocused' so if you go back you make sure new bookmarks are loaded as well
  }, [isFocused, bookType, chapters, handleLoadPages]);

  if (!infoBookPages) {
    return null;
  }

  return (
    <BookPagesList
      onReloadPages={handleLoadPages}
      bookTabInfo={bookTabInfo}
      showHeader={false}
      navigation={navigation}
      InfoBookPages={infoBookPages}
      bookType={bookType}
    />
  );
};

export default BookPageIntermediateListScreen;
