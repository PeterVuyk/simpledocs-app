import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import configHelper from '../../helper/configHelper';
import {
  FIRST_BOOK_TAB,
  SECOND_BOOK_TAB,
  THIRD_BOOK_TAB,
} from '../../model/BottomTab';
import logger from '../../util/logger';
import bookPagesRepository from '../../database/repository/bookPagesRepository';

export const BLANK_WEBPAGE = 'https://linkpage.web.app/';

const getIdFromUrl = (url: string): string | null => {
  const path = url.split('/');
  if (path.length < 4) {
    return null;
  }
  return path[path.length - 1];
};

interface NavigationParams {
  bookPageChapter: string;
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
  ) => {
    const currentTab = await configHelper.getTabByBookType(bookType);
    if (currentTab === SECOND_BOOK_TAB) {
      return navigation.navigate('SecondBookTabStack', {
        screen: 'SecondBookTabDetailsScreen',
        params: navigationParams,
      });
    }
    if (currentTab === FIRST_BOOK_TAB) {
      return navigation.navigate('FirstBookTabStack', {
        screen: 'FirstBookTabDetailsScreen',
        params: navigationParams,
      });
    }
    if (currentTab === THIRD_BOOK_TAB) {
      return navigation.navigate('ThirdBookTabStack', {
        screen: 'ThirdBookTabDetailsScreen',
        params: navigationParams,
      });
    }
    return Promise.reject(
      new Error(
        `Intended to navigateToChapter from useContentNavigator but failed because no tab available, given navigation params: ${JSON.stringify(
          navigationParams,
        )}`,
      ),
    );
  };

  const redirect = async (
    targetBookType: string,
    chapter: string,
    currentBookType: string,
  ): Promise<void> => {
    const currentTab = await configHelper.getTabByBookType(currentBookType);
    const targetTab = await configHelper.getTabByBookType(targetBookType);
    if (targetTab === FIRST_BOOK_TAB) {
      if (currentTab === FIRST_BOOK_TAB) {
        navigation.push('FirstBookTabDetailsScreen', {
          bookPageChapter: chapter,
          bookType: targetBookType,
        });
        return;
      }
      navigation.navigate('FirstBookTabStack', {
        screen: 'FirstBookTabDetailsScreen',
        params: { bookPageChapter: chapter, bookType: targetBookType },
      });
    }
    if (targetTab === SECOND_BOOK_TAB) {
      if (currentTab === SECOND_BOOK_TAB) {
        navigation.push('SecondBookTabDetailsScreen', {
          bookPageChapter: chapter,
          bookType: targetBookType,
        });
      }
      navigation.navigate('SecondBookTabStack', {
        screen: 'SecondBookTabDetailsScreen',
        params: { bookPageChapter: chapter, bookType: targetBookType },
      });
    }
    if (targetTab === THIRD_BOOK_TAB) {
      if (currentTab === THIRD_BOOK_TAB) {
        navigation.push('ThirdBookTabDetailsScreen', {
          bookPageChapter: chapter,
          bookType: targetBookType,
        });
      }
      navigation.navigate('ThirdBookTabStack', {
        screen: 'ThirdBookTabDetailsScreen',
        params: { bookPageChapter: chapter, bookType: targetBookType },
      });
    }
  };

  const navigateFromId = (id: string, currentBookType: string) => {
    return bookPagesRepository.getPageById(id, page => {
      return new Promise(resolve => {
        redirect(page.bookType, page.chapter, currentBookType).then(resolve);
      });
    });
  };

  const navigateFromHttpsUrlToChapter = async (
    url: string,
    currentBookType: string,
  ) => {
    const id = getIdFromUrl(url);
    if (id === null) {
      logger.errorFromMessage(
        `Navigation from link in html file to another chapter failed, url with link: ${url}, currentBookType: ${currentBookType}`,
      );
      return;
    }
    await navigateFromId(id, currentBookType);
  };

  return {
    blankWebpage: BLANK_WEBPAGE,
    navigateFromHttpsUrlToChapter,
    navigateFromId,
    navigateToChapter,
  };
}

export default useContentNavigator;
