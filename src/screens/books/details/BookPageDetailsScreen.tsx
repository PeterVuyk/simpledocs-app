import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
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
        infoBookPage: string;
        bookType: string;
      };
    },
    'params'
  >;
}

const BookPageDetailsScreen: FC<Props> = ({ navigation, route }) => {
  const [chapters, setChapters] = useState<InfoBookPage[]>([]);
  const { infoBookPage, bookType } = route.params;

  useEffect(() => {
    bookPagesRepository.getChapters(bookType, setChapters);
  }, [bookType, navigation]);

  return (
    <>
      {chapters.length !== 0 && (
        <DimensionsProvider
          children={window => (
            <BookPageDetails
              bookPageChapter={infoBookPage}
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
