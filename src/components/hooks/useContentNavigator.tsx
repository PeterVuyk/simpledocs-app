import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import configHelper from '../../helper/configHelper';
import { FIRST_BOOK_TAB, SECOND_BOOK_TAB } from '../../model/BottomTab';
import logger from '../../util/logger';

export const BLANK_WEBPAGE = 'https://page-blank.firebaseapp.com/';

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

interface NavigationParams {
  articleChapter: string;
  bookType: string;
  searchText?: {
    chapter: string;
    searchText: string;
  };
}

function useContentNavigator() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const navigateToChapter = async (
    navigationParams: NavigationParams,
    bookType: string,
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

  const navigateFromHttpsUrlToChapter = async (
    url: string,
    currentBookType: string,
  ) => {
    const bookType = getBookTypeFromUrl(url);
    const chapter = getChapterFromUrl(url);
    if (bookType === null || chapter === null) {
      logger.errorFromMessage(
        `Navigation from link in html file to another chapter failed, url with link: ${url}, currentBookType: ${currentBookType}`,
      );
      return;
    }
    await redirect(currentBookType, bookType, chapter);
  };

  return {
    blankWebpage: BLANK_WEBPAGE,
    navigateFromHttpsUrlToChapter,
    navigateToChapter,
  };
}

export default useContentNavigator;
