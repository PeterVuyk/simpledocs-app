import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import configHelper from '../../helper/configHelper';
import { FIRST_BOOK_TAB, SECOND_BOOK_TAB } from '../../model/BottomTab';
import logger from '../../util/logger';
import articleRepository from '../../database/repository/articleRepository';

export const BLANK_WEBPAGE = 'https://page-blank.firebaseapp.com/';

const getIdFromUrl = (url: string): string | null => {
  const path = url.split('/');
  if (path.length < 4) {
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
    const id = getIdFromUrl(url);
    if (id === null) {
      logger.errorFromMessage(
        `Navigation from link in html file to another chapter failed, url with link: ${url}, currentBookType: ${currentBookType}`,
      );
      return;
    }
    await articleRepository.getArticleById(id, article => {
      return new Promise(resolve => {
        redirect(currentBookType, article.bookType, article.chapter).then(
          resolve,
        );
      });
    });
  };

  return {
    blankWebpage: BLANK_WEBPAGE,
    navigateFromHttpsUrlToChapter,
    navigateToChapter,
  };
}

export default useContentNavigator;
