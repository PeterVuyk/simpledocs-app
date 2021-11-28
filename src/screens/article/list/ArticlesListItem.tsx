import React, { FC, useCallback } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ListItem from '../../../components/listItem/ListItem';
import { ArticleChapter } from '../../../model/articles/ArticleChapter';
import configHelper from '../../../helper/configHelper';
import { FIRST_BOOK_TAB } from '../../../model/BottomTab';
import useContentNavigator from '../../../components/hooks/useContentNavigator';
import SwipeableToggleBookmark from '../../../components/bookmarks/SwipeableToggleBookmark';

interface Props {
  showChapterDivisions?: string[];
  navigation: DrawerNavigationProp<any>;
  articleChapter: ArticleChapter;
  articleChapters: ArticleChapter[];
  onReloadArticles: () => void;
  bookType: string;
}

const ArticlesListItem: FC<Props> = ({
  showChapterDivisions,
  navigation,
  articleChapter,
  articleChapters,
  onReloadArticles,
  bookType,
}) => {
  const { navigateToChapter } = useContentNavigator();
  const navigateArticleList = useCallback(
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
      { articleChapter: articleChapter.chapter, bookType },
      bookType,
    );
  }, [articleChapter.chapter, bookType, navigateToChapter]);

  const handleItemClick = useCallback(async () => {
    const bookInfo = await configHelper.getConfigByBookType(bookType);
    if (
      showChapterDivisions === undefined ||
      bookInfo?.chapterDivisionsInIntermediateList.includes(
        articleChapter.chapterDivision,
      )
    ) {
      navigateToDetailsScreen();
      return;
    }
    const index = articleChapters.indexOf(articleChapter, 0);
    const nextChapter = articleChapters[index + 1];
    if (
      nextChapter === undefined ||
      !bookInfo?.chapterDivisionsInIntermediateList.includes(
        nextChapter.chapterDivision,
      )
    ) {
      navigateToDetailsScreen();
      return;
    }
    const nextChapters: ArticleChapter[] = [];
    nextChapters.push(articleChapters[index]);
    for (const chapter of articleChapters.slice(index + 1)) {
      if (
        !bookInfo?.chapterDivisionsInIntermediateList.includes(
          chapter.chapterDivision,
        )
      ) {
        break;
      }
      nextChapters.push(chapter);
    }
    navigateArticleList(nextChapters.map(chapter => chapter.chapter));
  }, [
    articleChapter,
    articleChapters,
    bookType,
    navigateArticleList,
    navigateToDetailsScreen,
    showChapterDivisions,
  ]);

  return (
    <SwipeableToggleBookmark
      articleChapter={articleChapter}
      onToggle={onReloadArticles}
    >
      <ListItem
        title={articleChapter.title}
        subTitle={articleChapter.subTitle}
        iconFile={articleChapter.iconFile}
        bookmarked={articleChapter.bookmarked}
        onSubmit={handleItemClick}
      />
    </SwipeableToggleBookmark>
  );
};

export default ArticlesListItem;
