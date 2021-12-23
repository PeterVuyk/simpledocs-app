import React, { FC, useCallback } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ListItem from '../../../components/listItem/ListItem';
import { InfoBookPage } from '../../../model/bookPages/InfoBookPage';
import configHelper from '../../../helper/configHelper';
import { FIRST_BOOK_TAB } from '../../../model/BottomTab';
import useContentNavigator from '../../../components/hooks/useContentNavigator';
import SwipeableToggleBookmark from '../../../components/bookmarks/SwipeableToggleBookmark';

interface Props {
  showChapterDivisions?: string[];
  navigation: DrawerNavigationProp<any>;
  infoBookPage: InfoBookPage;
  infoBookPages: InfoBookPage[];
  onReloadPages: () => void;
  bookType: string;
}

const BookPageListItem: FC<Props> = ({
  showChapterDivisions,
  navigation,
  infoBookPage,
  infoBookPages,
  onReloadPages,
  bookType,
}) => {
  const { navigateToChapter } = useContentNavigator();
  const navigateBookPageList = useCallback(
    async (chapters: string[]) => {
      if ((await configHelper.getTabByBookType(bookType)) === FIRST_BOOK_TAB) {
        navigation.navigate('FirstBookTabStack', {
          screen: 'FirstBookTabIntermediateScreen',
          params: { bookType, chapters },
        });
        return;
      }
      navigation.navigate('SecondBookTabStack', {
        screen: 'SecondBookTabIntermediateScreen',
        params: { bookType, chapters },
      });
    },
    [bookType, navigation],
  );

  const navigateToDetailsScreen = useCallback(() => {
    navigateToChapter(
      { bookPageChapter: infoBookPage.chapter, bookType },
      bookType,
    );
  }, [infoBookPage.chapter, bookType, navigateToChapter]);

  const handleItemClick = useCallback(async () => {
    const bookInfo = await configHelper.getConfigByBookType(bookType);
    if (
      showChapterDivisions === undefined ||
      bookInfo?.chapterDivisionsInIntermediateList.includes(
        infoBookPage.chapterDivision,
      )
    ) {
      navigateToDetailsScreen();
      return;
    }
    const index = infoBookPages.indexOf(infoBookPage, 0);
    const nextChapter = infoBookPages[index + 1];
    if (
      nextChapter === undefined ||
      !bookInfo?.chapterDivisionsInIntermediateList.includes(
        nextChapter.chapterDivision,
      )
    ) {
      navigateToDetailsScreen();
      return;
    }
    const nextChapters: InfoBookPage[] = [];
    nextChapters.push(infoBookPages[index]);
    for (const chapter of infoBookPages.slice(index + 1)) {
      if (
        !bookInfo?.chapterDivisionsInIntermediateList.includes(
          chapter.chapterDivision,
        )
      ) {
        break;
      }
      nextChapters.push(chapter);
    }
    navigateBookPageList(nextChapters.map(chapter => chapter.chapter));
  }, [
    infoBookPage,
    infoBookPages,
    bookType,
    navigateBookPageList,
    navigateToDetailsScreen,
    showChapterDivisions,
  ]);

  return (
    <SwipeableToggleBookmark
      infoBookPage={infoBookPage}
      onToggle={onReloadPages}
    >
      <ListItem
        title={infoBookPage.title}
        subTitle={infoBookPage.subTitle}
        iconFile={infoBookPage.iconFile}
        bookmarked={infoBookPage.bookmarked}
        onSubmit={handleItemClick}
      />
    </SwipeableToggleBookmark>
  );
};

export default React.memo(BookPageListItem);
