import React, { FC, useEffect, useState } from 'react';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import bookPagesRepository from '../../../database/repository/bookPagesRepository';
import { InfoBookPage } from '../../../model/bookPages/InfoBookPage';
import BookPageDetails from './BookPageDetails';
import DimensionsProvider from '../../../components/viewer/DimensionsProvider';
import ScreenContainer from '../../../components/ScreenContainer';

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
    // If the currentBookType is the same as the requested bookType, then no further action needed.
    if (currentBookType === bookType) {
      return () => null;
    }
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
  }, [isFocused, bookType, navigation, currentBookType]);

  // This is a safe guard to make sure that we don't get 'undefined is not an object'
  // when navigating between books from example links, notifications.
  if (bookType !== currentBookType) {
    return null;
  }

  return (
    <ScreenContainer>
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
    </ScreenContainer>
  );
};

export default BookPageDetailsScreen;
