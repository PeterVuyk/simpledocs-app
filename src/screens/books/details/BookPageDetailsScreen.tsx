import React, { FC, useEffect, useState } from 'react';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import bookPagesRepository from '../../../database/repository/bookPagesRepository';
import { InfoBookPage } from '../../../model/bookPages/InfoBookPage';
import BookPageDetails from './BookPageDetails';
import DimensionsProvider from '../../../components/viewer/DimensionsProvider';

interface Props {
  navigation: DrawerNavigationHelpers;
  route: RouteProp<
    {
      params: {
        bookPageChapter: string;
        bookType: string;
      };
    },
    'params'
  >;
}

const BookPageDetailsScreen: FC<Props> = ({ navigation, route }) => {
  const [currentBookType, setCurrentBookType] = useState<string>('');
  const [chapters, setChapters] = useState<InfoBookPage[]>([]);
  const { bookPageChapter, bookType } = route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    let isMounted = true;
    bookPagesRepository.getChapters(bookType, pages => {
      if (isMounted) {
        setChapters(pages);
        setCurrentBookType(bookType);
      }
    });
    // trigger also on is focused to make sure that the chapters are reloaded.
    // Important if a page is bookmarked then it need to be updated in the detail page as well.
    return () => {
      isMounted = false;
    };
  }, [isFocused, bookType, navigation]);

  // If the bookType changed because the user navigates from another book, then chapters need to be reset first.
  if (currentBookType !== bookType) {
    return null;
  }

  return (
    <>
      {chapters.length !== 0 && (
        <DimensionsProvider
          children={window => (
            <BookPageDetails
              bookPageChapter={bookPageChapter}
              bookType={bookType}
              infoBookPages={chapters}
              windowWidth={window}
            />
          )}
        />
      )}
    </>
  );
};

export default BookPageDetailsScreen;
