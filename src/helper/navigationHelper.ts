import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import configHelper from './configHelper';
import { FIRST_BOOK_TAB, SECOND_BOOK_TAB } from '../model/BookTab';
import logger from './logger';

export const BLANK_WEBPAGE = 'https://page-blank.firebaseapp.com/';

interface NavigationParams {
  articleChapter: string;
  bookType: string;
  searchText?: {
    chapter: string;
    searchText: string;
  };
}

const navigateToChapter = async (
  navigationParams: NavigationParams,
  bookType: string,
  navigation: StackNavigationProp<any> | DrawerNavigationProp<any>,
): Promise<void> => {
  const currentTab = await configHelper.getTabByBookType(bookType);
  if (currentTab === SECOND_BOOK_TAB) {
    navigation.navigate('SecondBookTabStack', {
      screen: 'SecondBookTabDetailsScreen',
      params: navigationParams,
    });
    return;
  }
  if (currentTab === FIRST_BOOK_TAB) {
    navigation.navigate('FirstBookTabStack', {
      screen: 'FirstBookTabDetailsScreen',
      params: navigationParams,
    });
  }
};

const redirect = async (
  currentBookType: string,
  targetBookType: string,
  chapter: string,
  navigation: StackNavigationProp<any>,
): Promise<void> => {
  const currentTab = await configHelper.getTabByBookType(currentBookType);
  const targetTab = await configHelper.getTabByBookType(targetBookType);
  if (targetTab === SECOND_BOOK_TAB) {
    if (currentTab === SECOND_BOOK_TAB) {
      navigation.push('SecondBookTabDetailsScreen', {
        articleChapter: chapter,
        bookType: targetBookType,
      });
      return;
    }
    navigation.navigate('SecondBookTabStack', {
      screen: 'SecondBookTabDetailsScreen',
      params: { articleChapter: chapter, bookType: targetBookType },
    });
  }
  if (targetTab === FIRST_BOOK_TAB) {
    if (currentTab === FIRST_BOOK_TAB) {
      navigation.push('FirstBookTabDetailsScreen', {
        articleChapter: chapter,
        bookType: targetBookType,
      });
      return;
    }
    navigation.navigate('FirstBookTabStack', {
      screen: 'FirstBookTabDetailsScreen',
      params: { articleChapter: chapter, bookType: targetBookType },
    });
  }
};

const getBookTypeFromUrl = (url: string): string | null => {
  const path = url.split(BLANK_WEBPAGE);
  if (path.length === 0) {
    return null;
  }
  const article = path[1].split('/');
  return article.length === 0 ? null : article[0];
};

const getChapterFromUrl = (url: string): string | null => {
  const path = url.split('/');
  if (path.length < 5) {
    return null;
  }
  return path[path.length - 1];
};

const navigateFromHttpsUrlToChapter = async (
  url: string,
  currentBookType: string,
  navigation: StackNavigationProp<any>,
) => {
  const bookType = getBookTypeFromUrl(url);
  const chapter = getChapterFromUrl(url);
  if (bookType === null || chapter === null) {
    logger.errorFromMessage(
      `Navigation from link in html file to another chapter failed, url with link: ${url}, currentBookType: ${currentBookType}`,
    );
    return;
  }
  await redirect(currentBookType, bookType, chapter, navigation);
};

const navigationHelper = {
  navigateToChapter,
  navigateFromHttpsUrlToChapter,
};

export default navigationHelper;
