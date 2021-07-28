import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import configHelper from './configHelper';
import { FIRST_ARTICLE_TAB, SECOND_ARTICLE_TAB } from '../model/ArticleTab';
import logger from './logger';

export const BLANK_WEBPAGE = 'https://page-blank.firebaseapp.com/';

interface NavigationParams {
  articleChapter: string;
  articleType: string;
  searchText?: {
    chapter: string;
    searchText: string;
  };
}

const navigateToChapter = (
  navigationParams: NavigationParams,
  articleType: string,
  navigation: StackNavigationProp<any> | DrawerNavigationProp<any>,
): void => {
  const currentTab = configHelper.getTabByArticleType(articleType);
  if (currentTab === SECOND_ARTICLE_TAB) {
    navigation.navigate('SecondArticleTabStack', {
      screen: 'SecondArticleTabDetailsScreen',
      params: navigationParams,
    });
    return;
  }
  if (currentTab === FIRST_ARTICLE_TAB) {
    navigation.navigate('FirstArticleTabStack', {
      screen: 'FirstArticleTabDetailsScreen',
      params: navigationParams,
    });
  }
};

const redirect = (
  currentArticleType: string,
  targetArticleType: string,
  chapter: string,
  navigation: StackNavigationProp<any>,
): void => {
  const currentTab = configHelper.getTabByArticleType(currentArticleType);
  const targetTab = configHelper.getTabByArticleType(targetArticleType);
  if (targetTab === SECOND_ARTICLE_TAB) {
    if (currentTab === SECOND_ARTICLE_TAB) {
      navigation.push('SecondArticleTabDetailsScreen', {
        articleChapter: chapter,
        articleType: targetArticleType,
      });
      return;
    }
    navigation.navigate('SecondArticleTabStack', {
      screen: 'SecondArticleTabDetailsScreen',
      params: { articleChapter: chapter, articleType: targetArticleType },
    });
  }
  if (targetTab === FIRST_ARTICLE_TAB) {
    if (currentTab === FIRST_ARTICLE_TAB) {
      navigation.push('FirstArticleTabDetailsScreen', {
        articleChapter: chapter,
        articleType: targetArticleType,
      });
      return;
    }
    navigation.navigate('FirstArticleTabStack', {
      screen: 'FirstArticleTabDetailsScreen',
      params: { articleChapter: chapter, articleType: targetArticleType },
    });
  }
};

const getArticleTypeFromUrl = (url: string): string | null => {
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

const navigateFromHttpsUrlToChapter = (
  url: string,
  currentArticleType: string,
  navigation: StackNavigationProp<any>,
) => {
  const articleType = getArticleTypeFromUrl(url);
  const chapter = getChapterFromUrl(url);
  if (articleType === null || chapter === null) {
    logger.errorFromMessage(
      `Navigation from link in html file to another chapter failed, url with link: ${url}, currentArticleType: ${currentArticleType}`,
    );
    return;
  }
  redirect(currentArticleType, articleType, chapter, navigation);
};

const navigationHelper = {
  navigateToChapter,
  navigateFromHttpsUrlToChapter,
};

export default navigationHelper;
